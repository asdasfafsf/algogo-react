# ALGOGO-120 문제 상세 오류 화면 검증

문제 상세의 404와 일시 오류를 사용자 문구로 정규화하고 서버 `errorMessage` 노출을 제거했다. 큰 원형 경고 아이콘과 둥근 중앙 카드를 없앴으며 다시 시도, 문제 목록 이동, 재시도 중 로딩 골격은 유지했다.

## 자동 검증

- `node tests/problem-page-error.mjs`: 404·500·503 문구 정규화, 서버 문구 미사용, 로딩·재시도 연결, 장식 제거를 확인했다.
- `pnpm build`, `pnpm lint`, fixture TypeScript 검사와 `git diff --check`가 통과했다.

## 브라우저 QA 결과

- 2026-09-11 `/tests/fixtures/problem-error.html`을 데스크톱과 390×844에서 확인했다. 404와 503 모두 더미 응답의 내부 `errorMessage` 없이 제목, 짧은 안내, 복구 행동만 표시됐다.
- 다시 시도 직후 로딩 골격을 거쳐 더미 문제 `A + B`가 표시됐고 문제 목록 링크도 유지됐다.
- 버튼 hover 배경 변화와 Tab 키의 `focus-visible` 링을 확인했으며 브라우저 콘솔의 경고·오류는 없었다. 테스트 뒤 뷰포트 설정과 로컬 서버를 정리했다.
