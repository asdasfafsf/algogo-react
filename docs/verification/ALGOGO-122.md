# ALGOGO-122 문제 상세 빈 상태 검증

fixture: `/tests/fixtures/problem-detail-empty-states.html`

## 확인 항목

| 대상       | 확인 방법                                       | 기대 결과                                                                      |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| 준비 중 탭 | 풀이·제출 내역 탭의 화면, cursor, Tab 순서 확인 | 간결한 상태 배지를 표시하고 비활성 탭은 `not-allowed`이며 포커스를 받지 않음   |
| 태그 없음  | 빈 `typeList` 상태의 요소와 접근성 트리 확인    | `등록된 태그가 없습니다.`를 정적 문구로 표시하고 버튼·링크를 만들지 않음       |
| 태그 있음  | 가려진 태그를 hover, 선택, 키보드 포커스로 확인 | 기존 pointer·hover 피드백과 공개/숨김 동작을 유지함                            |
| 출처 없음  | 빈 출처 문구와 제목 영역 확인                   | `등록된 출처가 없습니다.`를 정적 문구로 표시하고 아이콘과 제목을 가운데 정렬함 |
| 반응형     | 1280×720, 390×844 viewport에서 확인             | 탭과 메타정보가 페이지 너비를 넘지 않음                                        |

## 실행 결과

- 데스크톱에서 준비 중 탭 2개는 disabled 상태와 `not-allowed` cursor를 유지했고, `문제` 탭 다음 Tab 포커스가 값이 있는 태그 버튼으로 이동해 비활성 탭을 건너뛰었다.
- 값이 있는 태그 버튼은 pointer와 hover 배경 피드백을 유지했고, 선택 시 `수학`, `구현` 태그가 표시됐다.
- 빈 태그와 빈 출처 문구에는 button, link, `role="button"` 조상이 없었다.
- 모바일에서 문서와 탭 목록의 `scrollWidth`가 각각 viewport와 컨테이너 너비를 넘지 않았다.
- 태그·출처 제목의 아이콘과 텍스트 중심선 차이는 데스크톱과 모바일에서 모두 0px였다.

## 정적 검증

- `rtk proxy node tests/problem-detail-empty-states.mjs`
- `rtk proxy node node_modules/typescript/bin/tsc -p tests/fixtures/tsconfig.json --noEmit`
- `rtk pnpm lint`
- `rtk pnpm build`
- `rtk proxy node --test --test-concurrency=1 tests/*.mjs`: 59개 통과
