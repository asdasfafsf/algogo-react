# ALGOGO-94 실행 소켓 수명주기 검증

## 수정 기준

- 인증 결과가 `0000`일 때만 소켓을 `WAITING`으로 전환한다. `JWT_EXPIRED`는 토큰 갱신 대상으로 보존하고, `JWT_INVALID` 등 다른 인증 실패는 명시적으로 거부한다.
- 연결 인증과 실행 ACK에 제한 시간을 두고, 소켓 부재·실행 중 재요청·연결 종료가 대기 중인 Promise를 끝내도록 한다.
- 실행 결과 구독은 새 handler로 교체하고, 재연결 전 소켓에서 늦게 도착한 결과와 제한 시간 뒤 도착한 이전 ACK를 무시한다.
- 전송·인증 실패는 성공 결과로 변환하지 않는다. 단일 실행과 테스트 케이스 실행 모두 실패 내용과 코드를 화면 상태에 남긴다.

## 자동 검증

- [x] `tests/execute-socket-lifecycle.mjs`: 정상 인증/ACK/결과, `JWT_EXPIRED`, 두 인증 응답 형식의 `JWT_INVALID`, 인증 무응답, 실행 중 연결 종료, 실행 ACK 인증 만료, ACK 무응답, 동시 실행 차단, 제한 시간 뒤 재실행, 이전 ACK 무시, 구독 교체, 이전 소켓 결과 무시, 연결 전 실행 실패를 검증했다.
- [x] `tests/execute-workflow.mjs`: 최초 연결의 인증 만료 갱신, 인증 실패 시 실행 중단, 실행 ACK 인증 만료의 1회 재시도, 인증 갱신 중 동시 실행 차단, 전송 오류의 명시적 실패 결과 변환을 검증했다.
- [x] 전체 `tests/*.mjs`: 48개 통과, 실패·건너뜀 없음.
- [x] 전체 `src/**/*.{ts,tsx,js,jsx}` ESLint 통과.
- [x] 수정 파일 Prettier 적용 및 TypeScript `--noEmit` 검사 통과.
- [x] Vite 프로덕션 빌드 통과. 기존 대용량 chunk 경고만 출력됐다.
- [x] `git diff --check` 통과.

`pnpm exec`는 공유 `node_modules`의 설치 상태 확인 과정에서 비대화형 삭제 확인 오류로 중단되어, 같은 설치의 TypeScript, ESLint, Prettier, Vite 실행 파일을 Node로 직접 실행했다.

## 로컬 연동 근거와 제한

- 루트 에이전트의 사전 조사에서 잘못된 토큰은 `auth`의 `JWT_INVALID` 뒤 서버 disconnect로 이어졌고, 유효한 로컬 JWT는 `auth`의 `0000`을 받았다. 구현은 두 경로를 각각 `AUTH_FAILED`와 `WAITING`으로 구분한다.
- 같은 조사에서 C++ A+B 요청은 소켓으로 전송됐지만 서버 ACK가 `errorCode: 0000`, `data.code: 9999`, `data.result: 예외 오류`였다. 프론트는 이 서버 실패를 `9999`로 보존해 결과에 표시하며, 소켓 전송 실패 코드와 구분한다.
- 로컬 백엔드의 요청 DTO/whitelist 처리로 `inputList`가 제거되는 것으로 추정되어 실제 정상 코드 출력은 확인하지 못했다. 이 이슈는 프론트 범위만 수정했으며 백엔드는 변경하지 않았다. 실제 편집기 화면 검증은 루트 에이전트가 이어서 수행한다.

## 루트 실제 브라우저 검증

로컬 QA 계정으로 Monaco에 C++ A+B 코드를 입력하여 실행했다. 인증 후 실제 서버 9999 응답이 오류 안내와 실행 결과의 `예외 오류`로 표시되고 실행 버튼은 재사용 가능했다. 테스트 실행도 성공 0/실패 1, 실제 출력 `예외 오류`로 종료되어 무한 대기로 남지 않았다. 정상 실행 성공은 확인되지 않았다.

백엔드 읽기 전용 런타임 검사에서 실제 RequestExecuteDto에 ValidationPipe(transform/whitelist)를 적용한 결과 validatedKeys=[] 및 hasInputList=false를 확인했다. 서버 DTO 수정은 프론트 범위를 벗어나 수행하지 않았다. 소켓 실패/만료/중복/timeout 시나리오는 가짜 transport 회귀 테스트이며 실제 서버 정상 실행과 구분한다.

통합 UI의 데스크톱 분할선 ArrowDown으로 aria-valuenow 500→520 변화도 실제 확인했다.
