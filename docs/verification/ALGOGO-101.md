# ALGOGO-101 UI 기본 상호작용 감사

2026-09-11. 프론트 dev 통합본 `ec4dc48` 기준. 사용자 요청의 대상은 shadcn/Radix 기본 상호작용이다. 보기만 한 항목과 실제 조작, 로컬 샘플과 서버 연동을 구분한다.

## 발견하고 수정한 문제

| 이슈 | 문제와 수정 | PR |
| --- | --- | --- |
| ALGOGO-102 | 오늘의 문제 자체 키보드 처리 → Radix Tabs. 비활성 패널 노출 수정. 캐러셀이 자식 입력 방향키를 가로채지 않으며 세로키/경계/reduced-motion 지원 | [140](https://github.com/asdasfafsf/algogo-react/pull/140) |
| ALGOGO-103 | 복사 실패 Promise 미처리와 키보드 피드백 누락 → 성공/실패/재시도/aria-live. 공백과 줄바꿈 원문 보존 | [141](https://github.com/asdasfafsf/algogo-react/pull/141) |
| ALGOGO-104 | 메뉴→Dialog→종료 시 포커스 이탈 수정. 언어/테마 Radix 이벤트 연결. 숨김 토글 aria-pressed와 진행률 aria-valuenow 전달 | [142](https://github.com/asdasfafsf/algogo-react/pull/142) |
| ALGOGO-105 | 사용자 요청에 따라 워드마크 기존 Pretendard Bold 복원, 승인된 로고 그림 유지 | [139](https://github.com/asdasfafsf/algogo-react/pull/139) |

## 실제 브라우저 검증

| 범위 | 실행한 확인 | 환경/결과 |
| --- | --- | --- |
| 홈 표시/선택 | 난이도 Space/카테고리 Enter 표시 전환, 페이지 크기 Space→End→Enter, Escape 및 trigger 복귀, 경계 페이지 disabled | 실제5175 로컬 API, 통과 |
| 홈·상세 이동 | 문제 제목 새 탭 열기, 문제 탭의 비활성 풀이/제출 건너뛰기, 글자 확대/축소 | 실제 로컬 문제 UUID, 통과 |
| 모바일 Sheet | 390px에서 메뉴 열기, 마지막 닫기에서 Tab 순환, Escape 후 메뉴 열기 버튼 복귀. 페이지 가로 넘침 없음, 표는 내부 스크롤 | 실제5175, 통과 |
| DropdownMenu | Enter/Space 열기, 비활성 skip, 선택 1회, Escape/바깥 클릭 후 복귀 | 실제 공용/소비처 fixture, 통과 |
| Popover·필터 | controlled 열림/닫힘, 난이도 부분 선택 mixed/전체 적용, 유형 검색/Space, 임시 선택 Escape·바깥 취소, 상태 즉시 반영 유지 | 실제 소비처 fixture, 통과 |
| Select·NativeSelect | 비활성 선택 skip, 선택값 표시, 모달 내 네이티브 언어 선택, 모달 내 Select Escape는 먼저 선택 메뉴만 닫음 | 홈 및 fixture, 통과 |
| Checkbox·Button | 레이블/Space 변경 각각 1회, disabled 무반응, 기본 button은 submit하지 않음, 명시적 submit만 1회 | fixture, 통과 |
| Tooltip·Clipboard | hover 표시, 키보드 포커스, Escape, 클릭 성공 안내/자동 초기화, 실패와 재시도, 실제 복사 내용 공백·빈줄 일치 | 실제 Clipboard API + 실패 writer fixture, 통과. 클립보드 복원 |
| Tabs | Home/End와 방향키 선택/포커스, aria-controls 연결, 활성 panel 하나만 노출 | 실제 오늘의 문제 탭 fixture, 통과 |
| Carousel | 내부 입력 ArrowLeft 캐럿 이동만, 루트 가로/세로키 이동, 비반복 처음/끝 disabled, 세로의 좌우키 무시 | 실제 컴포넌트 fixture, 통과 |
| reduced-motion | DevTools 미디어 모의로 자동재생 정지와 aria-live polite, 모의 해제 | fixture, 통과. 환경 복원 |
| Progress | 초기40→75→0의 표시값과 aria-valuenow 동기화 | fixture, 통과 |
| Header/Theme/Profile/Language | disabled 안내 항목, 샘플 헤더와 마이페이지 라우팅, 테마 키보드 선택, 언어 Java/Python 선택값 표시 | 실제 소비처 fixture, 통과 |
| 템플릿 Dialog | 추가/수정 메뉴 종료 후 이름 입력 포커스, Escape 후 템플릿 trigger 복귀, 읽은 샘플 이름 표시 | 템플릿 GET fixture, 통과. 서버 쓰기 차단 |
| 통합 중첩 Dialog | 설정 숫자 입력8 유지, Select Escape 1회는 부모 유지. 동시에 알림2개 열기→Escape 두 번째/첫 번째 순서로 닫힘→부모 입력 유지 | 통합5175 dialog-layers fixture, 통과 |
| 로고 글꼴 | 실제 computed Pretendard/700과 기존 PNG src 확인 | 통합5175, 통과 |

다이얼로그의 confirm 결과, 로딩 dismiss 방지, toast 타이머 소유권, 입력 초안 보존 상세 결과는 [ALGOGO-100 검증](ALGOGO-100.md)에 기록되어 있다. 이 감사에서는 새 통합본의 중첩 닫힘과 입력 보존을 다시 실행했다. 각 수정의 세부 기록은 [102](../../tests/fixtures/tabs-carousel.md), [103](ALGOGO-103.md), [104](ALGOGO-104.md)를 참조한다.

## 범위와 한계

- Card, Badge, Separator, Skeleton, Table 등 수동 상태가 없는 표시 래퍼는 코드/화면 구조를 확인했다. 쓰이지 않는 legacy DropUp/SelectBox와 Toggle 래퍼를 사용 중이라고 간주하거나 임의로 재작성하지 않았다.
- 실제 로컬 DB는 문제 1개이며 오늘의 문제 배정이 비어 있다. 여러 오늘의 문제와 캐러셀 슬라이드, 로그인 후 메뉴는 명시적 샘플로 검증했다.
- 실제 로그인, 서버 템플릿 저장/삭제, 계정 연동, 코드 실행/제출 서버 성공은 이 UI 감사 결과에 포함하지 않는다. 기존 백엔드 제약을 성공으로 보고하지 않는다.
- 콘솔 오류: 통합 dialog-layers 검증 탭의 error 로그 없음.

## 통합 자동 검증

- `tests/*.mjs` 18개 파일 모두 통과: 계정, 클립보드, API transport, domain boundaries, 에디터, 설정, 실행 응답/소켓/워크플로, 모달 controller, 문제 초기화/필터/store/presentation/transport.
- 전체 TypeScript, 전체 src ESLint, 모든 fixture TypeScript, Vite production build 통과.
- 환경의 pnpm wrapper가 symlink node_modules 재설치를 시도해 non-TTY 단계에서 중단됐다. node_modules를 제거하거나 재설치하지 않고 설치된 TypeScript/ESLint/Vite 엔트리를 직접 실행해 동일 검사를 완료했다.
- 기존 Monaco 포함 번들 크기 경고는 남아 있다. 새 타입/빌드 오류는 없다.
- viewport와 미디어 모의는 복원했고, 테스트용 서버/탭은 정리한다. 사용자 미리보기5175는 통합 dev 상태로 유지한다.
