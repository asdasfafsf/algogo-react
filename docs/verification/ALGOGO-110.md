# ALGOGO-110: 인증 화면 단순화 검증

## 변경

- 로그인과 회원가입 화면에서 좌측 홍보 패널, 추상 장식 도형, 기능 아이콘 목록, 홍보 문구와 카드 컨테이너를 제거했다.
- 상단에는 기존 Tenada 로고를 사용한 홈 링크만 두고, 중앙 `max-w-sm` 영역에는 현재 인증 목적을 나타내는 제목, 한 문장 설명, 전환 링크와 OAuth 버튼만 배치했다. 홈으로 연결되는 저작권 문구처럼 목적이 모호한 요소는 두지 않았다.
- 로그인·회원가입 전환은 `destination` query를 그대로 인코딩해 유지한다. Google과 Kakao OAuth 진입 URL도 기존 destination 전달 방식을 유지한다.
- 로고 링크, 인증 전환 링크, OAuth 버튼에 hover·focus-visible·active 상태를 제공했다. OAuth 요청이 시작되면 두 버튼을 모두 비활성화해 중복 요청을 막는다.

## 자동 검증

- `node tests/auth-page.mjs`: query와 hash를 포함한 destination의 로그인/회원가입 전환 보존 및 Google OAuth 진입 URL 전달을 확인했다.
- 수정 파일 Prettier 및 ESLint, `pnpm lint`, TypeScript/Vite 프로덕션 빌드, `git diff --check`를 수행했다.
- 빌드는 기존 Monaco 관련 대용량 chunk 경고만 출력했고 실패는 없었다.

## 루트 브라우저 QA 시나리오

1. 데스크톱과 320px·390px 모바일에서 `/login`, `/signup`을 연다.
   - 좌측 홍보 패널·장식 도형·기능 목록·카드가 없고, 상단 로고와 중앙 인증 폼만 보여야 한다.
   - 제목은 각각 `로그인`, `회원가입`이며 설명은 한 문장이어야 한다.
2. `/login?destination=%2Fproblem%2Fuuid-123%3Ftab%3Dcode%23editor`에서 회원가입을 누른다.
   - `/signup` 전환 뒤에도 동일한 encoded destination이 유지되어야 한다. 반대 전환도 확인한다.
3. Google과 Kakao 버튼을 각각 누른다.
   - 선택한 버튼은 이동 중 상태가 되고 두 OAuth 버튼이 비활성화되어 중복 클릭되지 않아야 한다.
   - OAuth URL의 destination이 현재 destination과 같아야 한다.
4. 로고, 전환 링크, OAuth 버튼을 마우스와 Tab/Enter로 조작한다.
   - hover, focus-visible, active 상태가 보이고 disabled OAuth 버튼은 포커스나 클릭을 받지 않아야 한다.
