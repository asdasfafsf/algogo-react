export const PROBLEM_SORT_DEFAULT = 0;
export const PROBLEM_SORT_TITLE_ASC = 10;
export const PROBLEM_SORT_TITLE_DESC = 11;
export const PROBLEM_SORT_LEVEL_ASC = 20;
export const PROBLEM_SORT_LEVEL_DESC = 21;
export const PROBLEM_SORT_ANSWER_RATE_ASC = 30;
export const PROBLEM_SORT_ANSWER_RATE_DESC = 31;
export const PROBLEM_SORT_SUBMIT_COUNT_ASC = 40;
export const PROBLEM_SORT_SUBMIT_COUNT_DESC = 41;

export const PROBLEM_SORT_MAP = {
  DEFAULT: PROBLEM_SORT_DEFAULT,
  TITLE_ASC: PROBLEM_SORT_TITLE_ASC,
  TITLE_DESC: PROBLEM_SORT_TITLE_DESC,
  LEVEL_ASC: PROBLEM_SORT_LEVEL_ASC,
  LEVEL_DESC: PROBLEM_SORT_LEVEL_DESC,
  ANSWER_RATE_ASC: PROBLEM_SORT_ANSWER_RATE_ASC,
  ANSWER_RATE_DESC: PROBLEM_SORT_ANSWER_RATE_DESC,
  SUBMIT_COUNT_ASC: PROBLEM_SORT_SUBMIT_COUNT_ASC,
  SUBMIT_COUNT_DESC: PROBLEM_SORT_SUBMIT_COUNT_DESC,
} as const;
