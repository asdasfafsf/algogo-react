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
    value: name,
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
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
  {
    type: '유형',
    name: '안녕',
    value: '안녕',
    isSelected: false,
  },
];

const defaultProblemOption = (problemTypeList as ProblemOption[])
  .concat(problemGradeList) as ProblemOption[];
export default defaultProblemOption;
