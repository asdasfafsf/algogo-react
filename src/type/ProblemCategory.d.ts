type ProblemCategoryState = 'hide' | 'none' | 'view';

// 'name' 필드 값들로만 이루어진 타입 정의
// type ProblemCategory = typeof problemTypeList[number]['name'] | '알 수 없음' | ;
type ProblemCategory
    =
    | string
    | '알 수 없음'
    | '알고리즘 유형 숨김'
    | '그래프 이론'
    | '다이나믹 프로그래밍'
    | '그래프 탐색'
    | '수학'
    | '구현'
    | '너비 우선 탐색'
    | '브루트포스 알고리즘'
    | '자료 구조'
    | '백트래킹'
    | '문자열'
    | '그리디 알고리즘'
    | '깊이 우선 탐색'
    | '이분 탐색'
    | '정렬'
    | '최단 경로'
    | '누적 합'
    | '정수론'
    | '시뮬레이션'
    | '데이크스트라'
    | '트리'
    | '해시를 사용한 집합과 맵'
    | '조합론'
    | '사칙연산'
    | '비트마스킹'
    | '기하학'
    | '애드 혹'
    | '많은 조건 분기'
    | '해 구성하기';
