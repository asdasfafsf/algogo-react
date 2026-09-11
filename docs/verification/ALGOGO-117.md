# ALGOGO-117: 비로그인 코드 영역 인증 안내 검증

## 변경

- 비로그인 문제 상세에서 실제 코드 편집기와 실행 결과 화면이 흐리게 보이고, 그 위에 로그인·회원가입 안내가 표시되도록 복원했다.
- 장식용 잠금 아이콘 없이 로그인 뒤 할 수 있는 행동만 짧게 설명한다. 현재 문제의 경로, query와 hash를 `destination`에 보존한다.
- 편집기와 결과 패널의 `inert` 상태를 유지해 배경의 코드 입력, 설정, 실행, 테스트와 제출을 마우스·키보드에서 차단한다.
- 데스크톱은 오른쪽 작업 영역 전체를 한 번 덮고, 모바일은 코드와 실행 결과 화면을 각각 덮는다.

## Fixture

- `/tests/fixtures/problem-auth-gate.html`은 실제 `ProblemSection`, Monaco 편집기와 실행 결과 패널을 비로그인 상태로 렌더링한다.
- 저장된 사용자와 토큰을 제거하고 코드 API 요청을 차단·집계한다. 화면 상단에서 코드 API 요청 수, 런타임 오류 수와 현재 경로를 확인할 수 있다.
- fixture는 UI와 게스트 요청 차단 검증용이며 실제 로그인 성공이나 서버 실행 성공을 모사하지 않는다.

## 자동 검증

- `node tests/problem-auth-gate.mjs`: 로그인·회원가입 destination과 비로그인 오버레이·`inert` 회귀를 확인한다.
- `node tests/editor-template-initialization.mjs`: 저장된 세션이 없는 게스트가 편집기 초기화 요청을 시작하지 않는지 확인한다.
- `pnpm exec tsc -p tests/fixtures/tsconfig.json --noEmit`: fixture TypeScript를 확인한다.
- 수정 파일 ESLint와 Prettier, 전체 TypeScript/Vite 프로덕션 빌드, `git diff --check`를 수행한다.

## 브라우저 QA 기준

- 데스크톱에서 실제 편집기와 결과 패널이 흐려지고 안내 카드가 오른쪽 작업 영역 중앙에 표시되는지 확인한다.
- 390px에서 코드와 실행 결과 화면 각각에 안내 카드가 잘리지 않고 표시되는지 확인한다.
- 배경의 편집기와 컨트롤은 클릭·Tab으로 접근되지 않고, 회원가입과 로그인만 Tab·Enter로 동작하는지 확인한다.
- 로그인 버튼의 hover와 `focus-visible` 상태가 눈에 보이는지 확인한다.
- 로그인과 회원가입 링크가 `/problem/fixture-guest?tab=code#editor` 전체를 인코딩한 destination을 갖는지 확인한다.
- fixture 최초 렌더와 위 상호작용 뒤 코드 API 요청 수 0, 런타임 오류 수 0을 확인한다.

## 브라우저 QA 결과

- 2026-09-11에 로컬 `http://127.0.0.1:5187/tests/fixtures/problem-auth-gate.html`에서 실제 `ProblemSection`, Monaco와 실행 결과 패널을 렌더링했다.
- 데스크톱에서 오른쪽 작업 영역 전체가 흐려지고 안내 카드가 그 위 중앙에 표시됐다. 390×844에서는 코드와 실행 결과 화면을 각각 열어 카드와 두 행동이 잘리지 않는 것을 확인했다.
- 코드와 실행 결과 화면의 접근성 트리에는 흐려진 편집기 컨트롤이 노출되지 않았고 회원가입·로그인 링크만 남았다. Tab으로 두 링크에 순서대로 이동했으며 로그인 링크의 `focus-visible` 링을 화면에서 확인했다.
- 로그인 링크는 `/login?destination=%2Fproblem%2Ffixture-guest%3Ftab%3Dcode%23editor`로 이동했다. 현재 문제 경로의 query와 hash가 모두 보존됐다.
- Chrome에서 로그인 링크의 `:hover`를 적용해 배경색이 바뀌고 글자색 대비가 유지되는 것을 computed style과 화면으로 확인했다.
- fixture 표시와 코드·실행 결과 전환, 인증 링크 확인 뒤 코드 API 요청 0건, WebSocket 연결 0건, fixture 런타임 오류 0건, 브라우저 오류 로그 0건을 확인했다.
