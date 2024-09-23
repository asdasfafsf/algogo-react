export const defaultProblemLevelList = Array.from(Array(30), (_, k) => {
  let name;
  if (k < 5) {
    name = `브론즈 ${5 - (k % 5)}`;
  } else if (k < 10) {
    name = `실버 ${5 - (k % 5)}`;
  } else if (k < 15) {
    name = `골드 ${5 - (k % 5)}`;
  } else if (k < 20) {
    name = `플래티넘 ${(k % 5) + 1}`;
  } else if (k < 25) {
    name = `다이아 ${5 - (k % 5)}`;
  } else {
    name = `루비 ${5 - (k % 5)}`;
  }
  return {
    name,
    value: (k + 1).toString(),
    isSelected: false,
  };
});

export default defaultProblemLevelList;
