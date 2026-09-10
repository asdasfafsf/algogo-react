# ALGOGO-90: 문제 필터 전송 검증

## 재현과 기준

- `GET /api/v2/problems?pageNo=1&pageSize=20&levelList[]=5`는 로컬 API에서 난이도 1의 문제 1개를 반환해 난이도 5 필터가 적용되지 않음을 확인했다.
- 백엔드 `InquiryProblemsSummaryDto`는 `levelList`가 배열일 때만 숫자 배열로 변환한다. 단일 반복 키는 스칼라이므로 배열 변환을 거치지 않는다.

## 실행 결과

- [x] Vite SSR 모듈 검증에서 단일 난이도는 `levelList=1&levelList=1`, 다중 난이도·유형·상태는 각 반복 키, 단일 유형·상태는 스칼라 키, 빈 배열은 쿼리 미포함으로 전송됨을 확인했다. 직렬화 전후 요청 객체도 동일함을 확인했다.
- [x] 읽기 전용 로컬 API(`localhost:3001`)에서 `levelList=0&levelList=0`은 0개, `levelList=1&levelList=1`은 난이도 1의 1개, `levelList=5&levelList=5`는 0개를 반환했다.
- [x] `levelList=1&levelList=5`는 난이도 1의 1개를 반환했고, 난이도 필터를 생략한 요청도 기존 전체 목록 1개를 반환했다.
- [x] TypeScript 검사와 프로덕션 빌드, 수정 파일 ESLint·Prettier 검사를 수행했다.

## 테스트 데이터

로컬 DB에 기존 난이도 1 문제 1개만 있는 상태에서 읽기 요청으로 검증했다. 새 문제·사용자·인증 데이터는 만들거나 변경하지 않았다.
