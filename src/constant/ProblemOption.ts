export const problemGradeList = Array.from(Array(30), (_, k) => {
  let type; let
    name;
  if (k < 5) {
    type = '난이도';
    name = `브론즈 ${(k % 5) + 1}`;
  } else if (k < 10) {
    type = '난이도';
    name = `실버 ${(k % 5) + 1}`;
  } else if (k < 15) {
    type = '난이도';
    name = `골드 ${(k % 5) + 1}`;
  } else if (k < 20) {
    type = '난이도';
    name = `플래티넘 ${(k % 5) + 1}`;
  } else if (k < 25) {
    type = '난이도';
    name = `다이아 ${(k % 5) + 1}`;
  } else {
    type = '난이도';
    name = `루비 ${(k % 5) + 1}`;
  }
  return {
    type,
    name,
    value: k.toString(),
    isSelected: false,
  };
}) as ProblemOption[];

export const problemTypeList = [
  {
    type: '유형',
    name: '다이나믹 프로그래밍',
    value: '다이나믹 프로그래밍',
    isSelected: false,
  },
  {
    type: '유형',
    name: '정렬',
    value: '정렬',
    isSelected: true,
  },
  {
    type: '유형',
    name: '데이크스트라',
    value: '데이크스트라',
    isSelected: false,
  },
  {
    type: '유형',
    name: '정렬',
    value: '정렬',
    isSelected: false,
  },
  {
    type: '유형',
    name: '구현',
    value: '구현',
    isSelected: false,
  },
  {
    type: '유형',
    name: '자료 구조',
    value: '자료 구조',
    isSelected: false,
  },
  {
    type: '유형',
    name: '그래프 이론',
    value: '그래프 이론',
    isSelected: false,
  },
  {
    type: '유형',
    name: '브루트포스 알고리즘',
    value: '브루트포스 알고리즘',
    isSelected: false,
  },
  {
    type: '유형',
    name: '그래프 탐색',
    value: '그래프 탐색',
    isSelected: false,
  },
  {
    type: '유형',
    name: '정수론',
    value: '정수론',
    isSelected: false,
  },
  {
    type: '유형',
    name: '이분 탐색',
    value: '이분 탐색',
    isSelected: false,
  },
  {
    type: '유형',
    name: '너비우선탐색',
    value: '너비우선탐색',
    isSelected: false,
  },
  {
    type: '유형',
    name: '수학',
    value: '수학',
    isSelected: false,
  },
  {
    type: '유형',
    name: '애드 혹',
    value: '애드 혹',
    isSelected: false,
  },
  {
    type: '유형',
    name: '그리디 알고리즘',
    value: '그리디 알고리즘',
    isSelected: false,
  },
  {
    type: '유형',
    name: '그래프 탐색',
    value: '그래프 탐색',
    isSelected: false,
  },
  {
    type: '유형',
    name: '비트마스킹',
    value: '비트마스킹',
    isSelected: false,
  },
  {
    type: '유형',
    name: '조합론',
    value: '조합론',
    isSelected: false,
  },
  {
    type: '유형',
    name: '확률론',
    value: '확률론',
    isSelected: false,
  },
  {
    type: '유형',
    name: '비트필드를 이용한 다이나믹 프로그래밍',
    value: '비트필드를 이용한 다이나믹 프로그래밍',
    isSelected: false,
  },
  {
    type: '유형',
    name: '런타임 전의 전처리',
    value: '런타임 전의 전처리',
    isSelected: false,
  },
  {
    type: '유형',
    name: '희소 배열',
    value: '희소 배열',
    isSelected: false,
  },
  {
    type: '유형',
    name: '밀러-라빈 소수 판별법',
    value: '밀러-라빈 소수 판별법',
    isSelected: false,
  },
  {
    type: '유형',
    name: '백트래킹',
    value: '백트래킹',
    isSelected: false,
  },
  {
    type: '유형',
    name: '스택',
    value: '스택',
    isSelected: false,
  },
  {
    type: '유형',
    name: '배낭 문제',
    value: '배낭 문제',
    isSelected: false,
  },
  {
    type: '유형',
    name: '방향 비순환 그래프',
    value: '방향 비순환 그래프',
    isSelected: false,
  },
  {
    type: '유형',
    name: '작은 집합에서 큰 집합으로 합치는 테크닉',
    value: '작은 집합에서 큰 집합으로 합치는 테크닉',
    isSelected: false,
  },
  {
    type: '유형',
    name: '경사하강법',
    value: '경사하강법',
    isSelected: false,
  },
  {
    type: '유형',
    name: '느리게 갱신되는 세그먼트 트리',
    value: '느리게 갱신되는 세그먼트 트리',
    isSelected: false,
  },
  {
    type: '유형',
    name: '스프라그-그런트 정리',
    value: '스프라그-그런트 정리',
    isSelected: false,
  },
  {
    type: '유형',
    name: '피타고라스 정리',
    value: '피타고라스 정리',
    isSelected: false,
  },
  {
    type: '유형',
    name: '통계학',
    value: '통계학',
    isSelected: false,
  },
];

const defaultProblemOption = (problemTypeList as ProblemOption[])
  .concat(problemGradeList) as ProblemOption[];
export default defaultProblemOption;
