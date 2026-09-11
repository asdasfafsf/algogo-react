# ALGOGO-105 워드마크 서체 복원 검증

## 변경 결과

- `Logo.tsx`의 워드마크 클래스는 ALGOGO-99 이전 값인 `font-Pretendard font-bold leading-none tracking-tight`로 복원했다.
- 워드마크의 기대 computed font-family는 Pretendard, font-weight는 700이다.
- 승인된 심볼은 계속 `/brand/algogo-mark.png`를 사용하며, 심볼 크기, 워드마크 크기, 심볼-텍스트 간격, 색상·배치 관련 클래스는 변경하지 않았다.

## 정적 검증

- 변경 파일 ESLint와 Prettier 검사 통과.
- `b820791^`의 `Logo.tsx`와 비교해 워드마크 클래스 일치 확인.
- 이번 작업에서는 브라우저 자동화나 전체 빌드를 실행하지 않았다. 서체 클래스만 한 줄 복원했고, UI 실화면 검증은 별도 감사 작업에서 수행한다.
