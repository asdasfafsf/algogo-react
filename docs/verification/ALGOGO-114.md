# ALGOGO-114 랜딩 화면 검증

2026-09-11. 랜딩(`/landing`)은 실제 사용 흐름을 먼저 보여 주는 소개 화면으로 정돈했다. 문제 목록(`/problem`)과 오늘의 문제(`/problem/today`) 경로, 로그인과 계정 만들기 경로는 유지한다.

## 변경

- 가짜 코드 편집기, 둥근 아이콘 카드, 큰 배경 도형, 그라디언트와 과장된 소개 문구를 제거했다.
- 첫 화면에서 문제 목록과 오늘의 문제로 바로 갈 수 있게 하고, 이어지는 구역은 문제 고르기·브라우저 풀이·오늘의 문제의 실제 순서로 안내한다.
- 대회와 랭킹은 아직 이동할 수 없는 항목임을 `곧 열려요`로만 표시하며 링크나 hover 효과를 주지 않는다.
- 하단은 문제 목록과 오늘의 문제만 실제 링크로 남기고, 실제 조작 대상에는 hover·focus-visible·active 피드백을 적용했다.

## 자동 검증

- `rtk proxy node tests/landing-presentation.mjs`
- `rtk proxy node node_modules/typescript/bin/tsc -p tests/fixtures/tsconfig.json --noEmit`
- `rtk pnpm lint`
- `rtk pnpm build`
- `rtk git diff --check`

## 브라우저 확인

개발 서버에서 `/landing`과 `/tests/fixtures/landing.html`을 데스크톱, 390px, 320px 폭에서 확인한다.

| 범위        | 확인 절차                                      | 기대 결과                                                           |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| 첫 화면     | `문제 둘러보기`, `오늘의 문제 보기`를 클릭     | 각각 `/problem`, `/problem/today`로 이동                            |
| 풀이 흐름   | 세 행의 텍스트 링크를 hover, Tab, Enter로 조작 | 링크만 색상·focus ring·active 피드백을 보이고 해당 경로로 이동      |
| 계정        | 헤더 로그인/시작하기, 하단 계정 만들기를 확인  | 기존 `/login`, `/signup` 목적지를 유지                              |
| 미완성 메뉴 | 대회·랭킹 위에 마우스를 올리고 Tab 순회        | 링크·pointer cursor·hover·Tab 대상이 아님                           |
| 반응형      | 390px와 320px 폭으로 축소                      | 가로 넘침 없이 CTA가 줄바꿈되고 흐름 행의 링크가 본문 아래로 내려감 |
| 테마        | light/dark 전환                                | 경계, 본문, 링크 대비가 각 테마 토큰을 따름                         |

## 확인 결과

- 데스크톱에서 첫 CTA `문제 둘러보기`는 `/problem`, `오늘의 문제 보기`는 `/problem/today`로 실제 이동했다.
- 390×844와 320×720에서 문서 폭이 각 뷰포트보다 커지지 않았고, CTA는 세로로 정리되며 모든 본문과 링크가 남았다.
- 실제 링크는 `cursor: pointer`이며 hover·focus-visible·active 상태를 갖는다. 대회와 랭킹은 `span`으로만 렌더링되어 `cursor: auto`이고 Tab 순서에 포함되지 않는다.
- 브라우저 콘솔에는 랜딩 코드에서 발생한 오류가 없었다. Chrome 확장 프로그램의 연결 오류 한 건은 페이지 코드와 무관하게 별도로 확인됐다.
