# ALGOGO-104 메뉴에서 Dialog로 포커스 전달

## 문제
메뉴 항목에서 Dialog를 즉시 열거나 메뉴 상태의 effect에서 열면, 메뉴 닫힘 애니메이션과 포커스 복귀가 늦게 끝나 Dialog가 삭제될 메뉴 항목을 opener로 기억한다. 실제 브라우저에서 Dialog 종료 후 body로 포커스가 빠졌다.

## 결정
Radix 메뉴의 onCloseAutoFocus에서 템플릿 trigger를 먼저 포커스하고 다음 task에서 해당 Dialog 작업을 시작한다. 추가와 수정 모두 같은 경로를 사용하며 unmount 시 대기 타이머를 정리한다. 평소 메뉴 종료는 Radix 기본 처리를 유지한다.

## 대안
자체 전역 포커스/모달 스택은 중복 상태를 만들므로 추가하지 않는다. 단순 open=false effect는 종료 애니메이션 시점을 보장하지 않아 재현 검증에서 제외했다.

## 검증
추가/수정 메뉴→Dialog 입력 포커스→Escape→원래 템플릿 trigger 복귀를 브라우저에서 확인했다.
