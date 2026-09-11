# ALGOGO-104 기본 컨트롤 검증

2026-09-11 실제 공용 컴포넌트와 소비처를 `/tests/fixtures/controls.html`에서 브라우저로 검증했다. 인증은 샘플 사용자, 템플릿 읽기는 fixture 응답이며 쓰기는 차단했다.

| 대상 | 실행 및 관찰 결과 |
| --- | --- |
| DropdownMenu | Enter 열기, 비활성 건너뛰기, 선택 1회. Escape와 바깥 클릭 뒤 trigger 포커스 복귀 |
| controlled Popover | Escape 및 바깥 클릭 각각 열림/닫힘 1회. Escape 뒤 trigger 복귀 |
| Select | ArrowDown이 비활성을 건너뛰고 세 번째 선택, 값 three 반영. 실제 홈의 선택 입력은 End/Enter 및 Escape 후 trigger 복귀 |
| Checkbox | 보이는 레이블 클릭 및 Space가 각각 상태를 1회 변경. 비활성 체크박스 클릭은 checked 유지 |
| Button | 기본 버튼은 동작 1회/submit 0회. 명시적 submit만 제출 1회. 비활성 버튼은 동작과 제출 모두 0회 |
| Progress | aria-valuenow 초기 40, 75/0 선택과 표시 동기화 |
| Header/Profile | 준비 중 항목 aria-disabled, 활성 항목 /fixture-target 이동. 마이페이지 선택 /me 이동 |
| Theme/Language | 키보드 다크 선택 적용 후 시스템 복원. Java 선택 trigger 반영 후 Python 복원 |
| 템플릿 추가/수정 | 메뉴 닫힘 뒤 실제 Dialog의 이름 입력 포커스. Escape 종료 후 코드 템플릿 trigger 복귀. 수정은 샘플 이름/내용 표시 |
| 난이도 필터 | 부분 선택은 전체 선택 mixed. Escape 취소 후 미선택. 전체 선택 적용은 5개 반영 |
| 유형 필터 | 검색/Space 임시 선택 후 바깥 클릭 취소. 재열기 미선택, 적용 후 1개 반영 |
| 상태 필터 | Space 선택 즉시 반영. Escape 종료 후 재열어 checked 유지 |
| 표시 토글 | 난이도 Space/카테고리 Enter에 aria-pressed false→true, 접근성 이름 보기로 변경 |

템플릿 전환을 passive effect로 먼저 구현했으나 Dialog 종료 후 body로 포커스가 빠지는 것을 재현했다. 메뉴의 onCloseAutoFocus에서 trigger로 복귀한 다음 Dialog를 열도록 수정하고 추가/수정 모두 재검증했다.

정적 검증: 변경 파일 ESLint/Prettier, 전체 source TypeScript/Vite build, fixture TypeScript, 기존 tests/*.mjs 17개 파일, diff check 통과. 체크박스 기존 onClick props는 유지한다.

실제 인증, 템플릿 저장/삭제, 로그아웃 서버 동작은 검증하지 않았다.
