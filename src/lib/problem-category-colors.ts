type CategoryColorGroup =
  | "array"
  | "stack-queue"
  | "tree"
  | "graph-traversal"
  | "shortest-path"
  | "dp-basic"
  | "dp-advanced"
  | "string"
  | "math"
  | "geometry"
  | "sort-search"
  | "greedy"
  | "implementation"
  | "combinatorics"
  | "advanced-ds";

const categoryColorByGroup: Record<CategoryColorGroup, string> = {
  array:
    "bg-cat-array/10 text-cat-array border-cat-array/20 hover:bg-cat-array/15",
  "stack-queue":
    "bg-cat-stack-queue/10 text-cat-stack-queue border-cat-stack-queue/20 hover:bg-cat-stack-queue/15",
  tree: "bg-cat-tree/10 text-cat-tree border-cat-tree/20 hover:bg-cat-tree/15",
  "graph-traversal":
    "bg-cat-graph-traversal/10 text-cat-graph-traversal border-cat-graph-traversal/20 hover:bg-cat-graph-traversal/15",
  "shortest-path":
    "bg-cat-shortest-path/10 text-cat-shortest-path border-cat-shortest-path/20 hover:bg-cat-shortest-path/15",
  "dp-basic":
    "bg-cat-dp-basic/10 text-cat-dp-basic border-cat-dp-basic/20 hover:bg-cat-dp-basic/15",
  "dp-advanced":
    "bg-cat-dp-advanced/10 text-cat-dp-advanced border-cat-dp-advanced/20 hover:bg-cat-dp-advanced/15",
  string:
    "bg-cat-string/10 text-cat-string border-cat-string/20 hover:bg-cat-string/15",
  math: "bg-cat-math/10 text-cat-math border-cat-math/20 hover:bg-cat-math/15",
  geometry:
    "bg-cat-geometry/10 text-cat-geometry border-cat-geometry/20 hover:bg-cat-geometry/15",
  "sort-search":
    "bg-cat-sort-search/10 text-cat-sort-search border-cat-sort-search/20 hover:bg-cat-sort-search/15",
  greedy:
    "bg-cat-greedy/10 text-cat-greedy border-cat-greedy/20 hover:bg-cat-greedy/15",
  implementation:
    "bg-cat-implementation/10 text-cat-implementation border-cat-implementation/20 hover:bg-cat-implementation/15",
  combinatorics:
    "bg-cat-combinatorics/10 text-cat-combinatorics border-cat-combinatorics/20 hover:bg-cat-combinatorics/15",
  "advanced-ds":
    "bg-cat-advanced-ds/10 text-cat-advanced-ds border-cat-advanced-ds/20 hover:bg-cat-advanced-ds/15",
};

// v2 config/categories.ts의 categoryTypes 한국어 label 전체 매핑이다.
const v2CategoryGroupByType: Record<string, CategoryColorGroup> = {
  배열: "array",
  "연결 리스트": "array",
  해시: "array",
  해시맵: "array",
  "해시 테이블": "array",
  스택: "stack-queue",
  큐: "stack-queue",
  덱: "stack-queue",
  "우선순위 큐": "stack-queue",
  트리: "tree",
  "이진 트리": "tree",
  "이진 탐색 트리": "tree",
  "최소 공통 조상": "tree",
  "트리 순회": "tree",
  "오일러 투어": "tree",
  그래프: "graph-traversal",
  "너비 우선 탐색": "graph-traversal",
  "깊이 우선 탐색": "graph-traversal",
  "위상 정렬": "graph-traversal",
  "이분 그래프": "graph-traversal",
  "강한 연결 요소": "graph-traversal",
  "오일러 경로": "graph-traversal",
  "단절점/단절선": "graph-traversal",
  다익스트라: "shortest-path",
  "벨만-포드": "shortest-path",
  "플로이드-워셜": "shortest-path",
  SPFA: "shortest-path",
  "네트워크 플로우": "shortest-path",
  "이분 매칭": "shortest-path",
  "최소 비용 최대 유량": "shortest-path",
  "최소 신장 트리": "shortest-path",
  "다이나믹 프로그래밍": "dp-basic",
  "배낭 문제": "dp-basic",
  "최장 증가 부분 수열": "dp-basic",
  "최장 공통 부분 수열": "dp-basic",
  메모이제이션: "dp-basic",
  "비트마스크 DP": "dp-advanced",
  "트리 DP": "dp-advanced",
  "확률 DP": "dp-advanced",
  "기댓값 DP": "dp-advanced",
  "게임 이론": "dp-advanced",
  "볼록 껍질 트릭": "dp-advanced",
  "분할 정복 최적화": "dp-advanced",
  "Knuth 최적화": "dp-advanced",
  문자열: "string",
  KMP: "string",
  "라빈-카프": "string",
  "접미사 배열": "string",
  "접미사 트리": "string",
  "아호-코라식": "string",
  매내처: "string",
  "문자열 해싱": "string",
  트라이: "string",
  "Z 알고리즘": "string",
  수학: "math",
  정수론: "math",
  소수: "math",
  "GCD/LCM": "math",
  "모듈러 연산": "math",
  "FFT/NTT": "math",
  행렬: "math",
  "중국인의 나머지 정리": "math",
  뫼비우스: "math",
  "오일러 피": "math",
  기하: "geometry",
  "볼록 껍질": "geometry",
  "선분 교차": "geometry",
  CCW: "geometry",
  "좌표 압축": "geometry",
  "로테이팅 캘리퍼스": "geometry",
  "반평면 교집합": "geometry",
  정렬: "sort-search",
  "이분 탐색": "sort-search",
  "투 포인터": "sort-search",
  "슬라이딩 윈도우": "sort-search",
  "파라메트릭 서치": "sort-search",
  "삼분 탐색": "sort-search",
  그리디: "greedy",
  스위핑: "greedy",
  "활동 선택": "greedy",
  "허프만 코딩": "greedy",
  구현: "implementation",
  시뮬레이션: "implementation",
  브루트포스: "implementation",
  재귀: "implementation",
  "분할 정복": "implementation",
  비트마스킹: "implementation",
  애드혹: "implementation",
  조합론: "combinatorics",
  백트래킹: "combinatorics",
  순열: "combinatorics",
  "포함-배제": "combinatorics",
  "카탈란 수": "combinatorics",
  "뤼카 정리": "combinatorics",
  버니사이드: "combinatorics",
  "세그먼트 트리": "advanced-ds",
  "펜윅 트리": "advanced-ds",
  "유니온 파인드": "advanced-ds",
  "스파스 테이블": "advanced-ds",
  "레이지 프로퍼게이션": "advanced-ds",
  "머지 소트 트리": "advanced-ds",
  "평방 분할": "advanced-ds",
  퍼시스턴트: "advanced-ds",
  "센트로이드 분할": "advanced-ds",
  HLD: "advanced-ds",
};

// 현재 API의 라벨이 v2 원본 표기와 달라질 때만 추가한다.
const apiCategoryAliases: Record<string, CategoryColorGroup> = {
  "해시를 사용한 집합과 맵": "array",
  해싱: "array",
  "그래프 이론": "graph-traversal",
  "그래프 탐색": "graph-traversal",
  "단절점과 단절선": "graph-traversal",
  데이크스트라: "shortest-path",
  "벨만–포드": "shortest-path",
  "플로이드–워셜": "shortest-path",
  "최대 유량": "shortest-path",
  "최소 스패닝 트리": "shortest-path",
  "비트필드를 이용한 다이나믹 프로그래밍": "dp-advanced",
  "트리에서의 다이나믹 프로그래밍": "dp-advanced",
  kmp: "string",
  "라빈–카프": "string",
  "접미사 배열과 lcp 배열": "string",
  "고속 푸리에 변환": "math",
  "뫼비우스 반전 공식": "math",
  "오일러 피 함수": "math",
  기하학: "geometry",
  "선분 교차 판정": "geometry",
  "값 / 좌표 압축": "geometry",
  "두 포인터": "sort-search",
  "매개 변수 탐색": "sort-search",
  "그리디 알고리즘": "greedy",
  "브루트포스 알고리즘": "implementation",
  "애드 혹": "implementation",
  "포함 배제의 원리": "combinatorics",
  "느리게 갱신되는 세그먼트 트리": "advanced-ds",
  "퍼시스턴트 세그먼트 트리": "advanced-ds",
  "제곱근 분할법": "advanced-ds",
  "분리 집합": "advanced-ds",
  "heavy-light 분할": "advanced-ds",
};

const categoryGroupByType = {
  ...v2CategoryGroupByType,
  ...apiCategoryAliases,
};

const FALLBACK_CATEGORY_COLOR =
  "bg-muted text-muted-foreground border-border hover:bg-muted/80";

export function getProblemCategoryBadgeColor(category: string): string {
  if (!Object.prototype.hasOwnProperty.call(categoryGroupByType, category)) {
    return FALLBACK_CATEGORY_COLOR;
  }

  const group = categoryGroupByType[category];
  return group ? categoryColorByGroup[group] : FALLBACK_CATEGORY_COLOR;
}
