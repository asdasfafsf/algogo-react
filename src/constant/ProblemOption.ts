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
  } else {
    type = '난이도';
    name = `다이아 ${(k % 5) + 1}`;
  }
  return {
    type,
    name,
    value: name,
    isSelected: false,
  };
}) as ProblemOption[];

export const problemTypeList = [

];

const defaultProblemOption = (problemTypeList as ProblemOption[])
  .concat(problemGradeList) as ProblemOption[];
export default defaultProblemOption;
