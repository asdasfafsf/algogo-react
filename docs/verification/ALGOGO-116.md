# ALGOGO-116 전역 상호작용 커서 검증

전역 기본 규칙에서 클릭 가능한 요소는 `pointer`, 텍스트 편집 요소는 `text`, 비활성 요소는 `not-allowed`를 사용한다. 개별 화면의 스타일을 바꾸지 않고 공용 컨트롤과 ARIA 역할을 기준으로 적용했다.

| 대상                          | 확인 내용                                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| 공용 버튼·링크·Radix trigger  | 활성 상태에서 `pointer`, 비활성 상태에서 `not-allowed`                    |
| Radix 메뉴·선택 항목          | 활성 항목의 포인터와 hover/focus/active 피드백, 비활성 항목의 비조작 상태 |
| 체크박스                      | 활성 상태의 포인터와 hover, 비활성 상태의 `not-allowed`                   |
| 입력·textarea·contenteditable | 편집 가능한 영역의 `text`                                                 |
| 문제 목록 행                  | 이미 있는 `cursor-pointer`가 회귀하지 않는지 정적 검사                    |

브라우저 검증은 `/tests/fixtures/cursor-controls.html`에서 공용 컨트롤, 역할 버튼, 문제 행, 편집 영역을 실제 계산 스타일로 확인한다.

2026-09-11 브라우저 fixture의 상태 문구가 `모든 기본 커서 규칙이 적용되었습니다.`로 표시됐다. 활성 버튼·링크·역할 버튼·문제 행·체크박스·Radix 메뉴/선택 trigger는 `pointer`, 텍스트 입력·textarea·contenteditable은 `text`, 비활성 버튼과 메뉴 항목은 `not-allowed`였다. 메뉴/선택 항목은 hover·focus·active 피드백도 함께 확인했다.

- `node tests/interaction-cursor.mjs` 통과
- `pnpm lint` 통과
- `pnpm build` 통과
- `node --test --test-concurrency=1 tests/*.mjs` 통과: 53개
