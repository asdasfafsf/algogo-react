type ProblemOption = {
  type: '난이도' | '유형' | '상태' | '출처';
  name: string;
  value: string;
  isSelected: boolean
};

type ProblemSort = {
  name: ProblemSortName,
  value: ProblemSortValue
};
type ProblemSortName = '상태' | '제목' | '난이도' | '정답률' | '제출' | '';
type ProblemSortValue = 1 | 2 | '1' | '2';
