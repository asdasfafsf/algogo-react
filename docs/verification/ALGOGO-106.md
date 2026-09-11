# ALGOGO-106 Tenada 워드마크 복원 검증

## 변경 결과

- `Logo.tsx`의 워드마크 서체를 UI 대규모 개편 이전 `LogoWithText.tsx`에서 사용하던 `font-Tenada`로 복원했다.
- 현재 `index.css`의 `--font-Tenada: Tenada` 토큰과 `@font-face` 정의를 그대로 사용한다.
- 기존 `font-bold`, `leading-none`, `tracking-tight`와 크기 맵은 유지했다. 심볼 PNG, 심볼 크기, 심볼-텍스트 간격, 색상·레이아웃 관련 클래스도 변경하지 않았다.

## 수직 정렬 판단

- 개편 이전의 `top-1`은 당시 `Typography`의 더 큰 글자 크기와 `leading-snug` 줄 높이를 기준으로 한 상대 위치 보정이었다.
- 현재 로고는 `inline-flex items-center` 안에서 심볼과 `leading-none` 워드마크를 중앙 정렬한다. 여기에 `top-1`을 다시 적용하면 현재 텍스트만 4px 아래로 이동해 승인된 배치를 바꾸므로 적용하지 않았다.

## 정적 검증

- 변경 파일 Prettier 및 ESLint 검사 실행.
- `167b6b7^:src/components/common/LogoWithText.tsx`에서 Tenada 사용 이력 확인.
- `git diff --check` 실행.

## 브라우저 검증

- 로컬 홈 화면의 헤더와 푸터 워드마크에서 computed `font-family: Tenada`, `font-weight: 700`을 확인했다.
- `document.fonts.check("700 24px Tenada")`가 `true`를 반환해 실제 폰트 로딩을 확인했다.
- 헤더와 푸터의 심볼이 기존 `/brand/algogo-mark.png`를 계속 사용하고, 중앙 정렬이 유지되는 것을 화면 캡처로 확인했다.
