# ALGOGO-185: v3 검증

2026-11-15 기준.

- TypeScript + Vite production build, 수정 파일 ESLint 통과.
- `node tests/problem-v3.mjs`: Python 생성 fixture 계약, React 표/수식 표현, 위험 URL 거부, 예제에서 기존 실행 요청 생성, 404 전용 폴백 및 500 전파 확인.
- 예제 초기화/공백/실행 workflow/소켓 수명주기/문제 페이지 오류 관련 27 tests 통과.
- `tests/fixtures/problem-v3.html`을 Chromium 1280×1000 및 390×844로 확인. 수식 5개, 병합 표, 목록, 이미지, 힌트 코드 표시. 반복 렌더 시 수식 중복 없음, 모바일 가로 넘침 없음, pageerror 없음.
- 복사한 예제의 탭, 연속 공백, 마지막 두 개행을 정확히 확인.
- `ui/safe` 적용 뒤 실제 수식으로 렌더한 javascript URL이 링크로 남지 않음을 확인.

## 범위

운영 DB migration, 기존 전체 데이터 재수집, DB 엔진 변경과 실제 사이트 전체 문제의 성능 비교는 수행하지 않았다. [적용 순서와 전환 범위](../problem-v3.md)를 따른다.
