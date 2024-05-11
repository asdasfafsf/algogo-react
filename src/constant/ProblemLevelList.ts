export const defaultProblemLevelList = Array.from(Array(30), (_, k) => {
  let name;
  if (k < 5) {
    name = `브론즈 ${(k % 5) + 1}`;
  } else if (k < 10) {
    name = `실버 ${(k % 5) + 1}`;
  } else if (k < 15) {
    name = `골드 ${(k % 5) + 1}`;
  } else if (k < 20) {
    name = `플래티넘 ${(k % 5) + 1}`;
  } else if (k < 25) {
    name = `다이아 ${(k % 5) + 1}`;
  } else {
    name = `루비 ${(k % 5) + 1}`;
  }
  return {
    name,
    value: name,
    isSelected: false,
  };
});

export default defaultProblemLevelList;
