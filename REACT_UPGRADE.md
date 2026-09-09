# 라이브러리 마이그레이션

작업 브랜치: `ALGOGO-76`

2026-09-09 npm registry의 stable latest와 설치 버전을 비교했습니다. 유지한 직접 의존성 47개 중 43개는 latest이며, 아래 개발 도구 4개는 공식 호환 범위와 실행 환경에 맞췄습니다.

## 호환 버전 예외

- TypeScript 6.0.3: typescript-eslint 8.70.0의 지원 범위가 `<6.1.0`이므로 7.0.2 보류.
- ESLint / @eslint/js 9.39.5: eslint-plugin-react 7.37.5의 peer 범위가 ESLint 9까지이므로 10 보류. ESLint 9 자체는 deprecated 상태이며 플러그인의 10 지원 시 함께 갱신해야 합니다.
- @types/node 24.13.3: Node 24 실행 환경에 맞춤. Node 26 타입 사용을 피함.

## 주요 변경

- Vite 8 + React plugin 6, TypeScript의 baseUrl 및 불필요한 프로젝트 참조 제거.
- Tailwind 4 Vite 플러그인으로 전환. JavaScript 테마를 CSS로 옮기고 공식 업그레이드 도구로 49개 템플릿의 유틸리티 문법 변환. PostCSS/Autoprefixer 직접 설정 제거.
- Zustand 5: 새 객체를 반환하던 선택자 6곳을 개별 선택자 또는 useShallow로 변경하여 무한 렌더링 방지.
- React Router 7 및 각 UI/API 라이브러리를 최신 stable로 갱신. Router 자체 타입을 사용하므로 v5 전용 @types/react-router-dom 제거.
- Monaco 0.56의 package exports에 맞춘 워커 경로 사용. loader.config로 설치된 에디터를 직접 연결하여 기본 CDN 버전과의 불일치 방지.
- React 19 타입 변경 반영. 미사용 react-query v3 제거.
- better-react-mathjax로 수식 렌더러 교체. 문제 본문에 직접 연결하고 인라인/블록 수식 및 내용 갱신 지원. startup 자동 처리와 컴포넌트 처리의 중복 방지. 수식 엔진은 MathJax 3 CDN에서 로드.
- Airbnb 설정은 최신 도구와 peer 충돌하므로 ESLint flat config 및 JS/TypeScript/React recommended 규칙으로 교체. 기존 hooks dependency-array 정책은 유지. 더 이상 존재하지 않는 규칙 주석과 미사용 바인딩 정리. 이전 Airbnb 스타일 규칙 전체를 그대로 유지하는 설정은 아님.

## 실행

Node 24 (`.nvmrc`), pnpm 9.15.9 (`packageManager`) 사용.

```sh
rtk proxy npx --yes pnpm@9.15.9 install --frozen-lockfile --strict-peer-dependencies
rtk proxy npx --yes pnpm@9.15.9 run build
rtk proxy npx --yes pnpm@9.15.9 run lint
rtk proxy npx --yes pnpm@9.15.9 run dev
```

현재 확인용 개발 서버: http://127.0.0.1:5175/

## 검증

- 잠금 파일 고정 설치 및 strict peer dependency 설치 통과.
- 최종 TypeScript + 프로덕션 빌드 통과. 기존 대용량 번들 경고는 남음.
- 새 flat config 기준 lint 오류/경고 없이 통과. 기존 Airbnb 린트 결과와 규칙 구성이 다름.
- 브라우저에서 기존 홈 배치와 로그인 경로 확인.
- 임시 Axios adapter 샘플 데이터로 문제 목록, 검색 입력/Enter, Cmd+K 포커스, 유형 필터 적용 확인.
- 샘플 문제 화면에서 Monaco 코드 변경, 설정 모달 열기 및 밝은 테마 적용 확인.
- 문제 본문의 인라인/블록 수식 2개 정상 생성, MathJax 오류 노드 0개 확인.
- 샘플 검증 파일은 검증 후 제거. 실제 OAuth 로그인, 서버 저장, 코드 실행/채점 및 전체 모바일 회귀 검증은 수행하지 않음.
- 후속 로컬 검증: NestJS 개발 서버 localhost:3001에 연결해 테스트 DB의 문제 목록·검색(로컬)·상세 본문·수식·Monaco 표시 확인. 두 수 검색 누락과 문제 링크의 운영 주소 고정은 별도 버그로 분리.

## 버전 목록

| 패키지 | 원본 | 마이그레이션 |
|---|---|---|
| `@fortawesome/fontawesome-svg-core` | ^6.5.1 | ^7.3.1 |
| `@fortawesome/free-brands-svg-icons` | ^6.5.1 | ^7.3.1 |
| `@fortawesome/free-regular-svg-icons` | ^6.5.1 | ^7.3.1 |
| `@fortawesome/free-solid-svg-icons` | ^6.5.1 | ^7.3.1 |
| `@fortawesome/react-fontawesome` | ^0.2.0 | ^3.5.0 |
| `@heroicons/react` | ^2.1.1 | ^2.2.0 |
| `@monaco-editor/react` | ^4.6.0 | ^4.7.0 |
| `@radix-ui/react-dropdown-menu` | ^2.1.6 | ^2.1.24 |
| `@radix-ui/react-navigation-menu` | ^1.2.5 | ^1.2.22 |
| `@radix-ui/react-scroll-area` | ^1.2.3 | ^1.2.18 |
| `@radix-ui/react-slot` | ^1.1.2 | ^1.3.3 |
| `@radix-ui/react-toggle` | ^1.1.1 | ^1.1.18 |
| `@tanstack/react-query` | ^5.80.7 | ^5.102.8 |
| `axios` | ^1.7.2 | ^1.20.0 |
| `better-react-mathjax` | 신규 | ^3.0.2 |
| `class-variance-authority` | ^0.7.1 | ^0.7.1 |
| `clsx` | ^2.1.1 | ^2.1.1 |
| `lucide-react` | ^0.474.0 | ^1.43.0 |
| `monaco-editor` | ^0.47.0 | ^0.56.0 |
| `qs` | ^6.13.0 | ^6.16.0 |
| `react` | ^18.2.0 | ^19.2.8 |
| `react-dom` | ^18.2.0 | ^19.2.8 |
| `react-hotkeys-hook` | ^4.6.1 | ^5.3.3 |
| `react-router-dom` | ^6.22.2 | ^7.18.3 |
| `react-tooltip` | ^5.28.0 | ^6.0.8 |
| `socket.io-client` | ^4.8.0 | ^4.8.3 |
| `tailwind-merge` | ^3.0.1 | ^3.6.0 |
| `tailwindcss-animate` | ^1.0.7 | ^1.0.7 |
| `zustand` | ^4.5.2 | ^5.0.15 |
| `@eslint/js` | 신규 | ^9.39.5 |
| `@tailwindcss/vite` | 신규 | ^4.3.3 |
| `@types/node` | ^22.8.5 | ^24.13.3 |
| `@types/qs` | ^6.9.16 | ^6.15.1 |
| `@types/react` | 18.2.19 | ^19.2.18 |
| `@types/react-dom` | ^18.2.19 | ^19.2.7 |
| `@vitejs/plugin-react` | ^4.2.1 | ^6.1.1 |
| `eslint` | ^8.57.0 | ^9.39.5 |
| `eslint-plugin-react` | 신규 | ^7.37.5 |
| `eslint-plugin-react-hooks` | ^4.6.0 | ^7.1.1 |
| `eslint-plugin-react-refresh` | ^0.4.12 | ^0.5.6 |
| `globals` | 신규 | ^17.12.0 |
| `prettier` | ^3.2.5 | ^3.9.6 |
| `tailwindcss` | ^3.4.1 | ^4.3.3 |
| `typescript` | ^5.2.2 | ~6.0.3 |
| `typescript-eslint` | 신규 | ^8.70.0 |
| `vite` | ^5.4.10 | ^8.2.2 |
| `vite-plugin-svgr` | ^4.2.0 | ^5.2.0 |

## 공식 참고 문서

- https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- https://tailwindcss.com/docs/upgrade-guide
- https://zustand.docs.pmnd.rs/reference/migrations/migrating-to-v5
- https://vite.dev/guide/migration
