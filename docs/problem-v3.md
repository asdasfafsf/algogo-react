# 문제 문서 v3 도입

## 계약

`ProblemDocument`는 `schemaVersion: 1`과 순서가 있는 `sections`를 가진다.

- `content`: `id`, `title`, `nodes`. 노드는 text, math, element 판별 유니온이다.
- `sample`: `id`, `order`, `input`, `output`, `explanation`. 예제 문자열은 trim/HTML 변환 없이 코드 실행 입력으로 전달한다.
- element는 허용 태그와 표시 속성만 가진다. script/style/event handler를 렌더링하지 않고 링크·이미지 URL은 HTTP(S)로 제한한다.
- 일반 TeX 구분자는 text에 보존하고 script[type=math/tex]는 math로 변환한다. SVG/MathML/embed처럼 아직 표현하지 못하는 본문은 수집을 실패시켜 누락된 문서를 저장하지 않는다.
- Python 파서가 만든 `problem-v3.json`을 API와 프론트 테스트에서 동일하게 사용한다. 계약 변경 시 세 저장소 fixture와 버전 검증을 함께 변경한다.

## 도입 순서

1. 백엔드 ALGOGO-184의 `PROBLEM_DOCUMENT` 테이블 생성 migration을 대상 DB에서 검토하고 적용한다. 이 작업에서 실제 적용한 DB는 별도의 로컬 테스트 MySQL뿐이다. 기존 DB의 migration 이력 확인 없이 전체 `migrate deploy`나 `db push`를 실행하지 않는다.
2. v3 API를 배포한다. Prisma 5.22와 기존 MySQL을 유지한다.
3. Temporal의 선행 수집 PR을 통합한 다음 ALGOGO-186 워커를 배포한다. 기존 workflow/activity 이름과 이력을 유지하고 `AcmicpcProblemV3Workflow`를 추가한다.
4. 대상 서버·DB를 확인한 뒤 한 문제씩 `PYTHONPATH=src uv run python scripts/collect_problem_v3.py 1000`으로 수집한다. 기존 배치 스케줄이나 전체 데이터 재수집은 자동 변경하지 않는다.
5. ALGOGO-185 프론트를 배포한다. v3가 404인 문제만 v2로 폴백한다. DB 오류·잘못된 문서를 성공으로 숨기지 않는다.

## 전환 중 보존되는 관계

`PROBLEM_V2`는 UUID/검색 메타데이터와 사용자 코드·풀이 상태·오늘의 문제 관계의 기준으로 유지한다. `PROBLEM_DOCUMENT.PROBLEM_UUID`가 같은 식별자를 참조한다. 새 문서와 v2 호환 데이터는 한 트랜잭션에서 저장한다. 수집 재시도·동시 upsert에서도 실제 저장된 UUID를 다시 조회한다.

v3 API는 필요한 메타데이터와 문서 JSON만 select한다. 기존 HTML/CSS 칼럼은 읽거나 전송하지 않는다. 전환 중에는 v2 화면과 기존 워크플로우를 위한 호환 HTML 쓰기가 남는다. 전체 v3 전환과 데이터 보존 범위가 확정된 뒤 해당 쓰기/칼럼을 제거한다. v2만 갱신되어 문서보다 문제의 updatedAt이 새로우면 v3는 404를 반환한다.

원본 페이지의 SHA-256, 수집 시각, 문서 버전을 저장한다. 원본 페이지 전체 보관은 이번 변경에 포함하지 않는다. 새 원본이 필요하면 재수집한다. DB 엔진 교체, 기존 메타데이터 테이블의 최종 재설계, 원본 아카이브 보관 정책은 별도 결정이다.

## 되돌리기

프론트를 v2 조회로 되돌리고 새 v3 수집 시작을 중단할 수 있다. 기존 UUID와 v2 호환 데이터가 남으므로 사용자 코드/풀이 상태를 재작성할 필요가 없다. 전환 중 문제 데이터를 삭제하거나 테이블을 자동 drop하지 않는다.
