import { PROBLEM_SORT_MAP } from '@constant/ProblemSort';
import { PROBLEM_TYPE_MAP } from '@constant/ProblemType.constant';

export type IquiryProblemsSummary = {
  pageNo?: number;
  pageSize?: number;
  title?: string;
  levelList?: number[];
  typeList?: ProblemType[];
  sort?: ProblemSort;
};

export type ProblemSummaryList = {
  problemList: ProblemSummary[];
  totalCount: number;
  pageSize: number;
  pageNo: number;
};

export type ProblemSummary = {
  uuid: string;
  title: string;
  levelText: string;
  answerCount: number;
  answerRate: number;
  submitCount: number;
  answerPeopleCount: number;
  source: string;
  sourceId: string;
  sourceUrl: string;
  level: number;
  typeList: ProblemType[];
};

export type Problem = {
  uuid: string;
  title: string;
  level: number;
  levelText: string;
  answerRate: number;
  submitCount: number;
  timeout: number;
  memoryLimit: number;
  answerCount: number;
  answerPeopleCount: number;
  source: string;
  sourceId: string;
  sourceUrl: string;
  content: string;
  limit?: string;
  hint?: string;
  subTask?: string;
  input?: string;
  output?: string;
  protocol?: string;
  etc?: string;
  additionalTimeAllowed: boolean;
  isSpecialJudge: boolean;
  isSubTask: boolean;
  isFunction: boolean;
  isInteractive: boolean;
  isTwoStep: boolean;
  isClass: boolean;
  isLanguageRestrict: boolean;
  createdAt: Date;
  updatedAt: Date;
  inputOutputList: ProblemInputOutput[];
  typeList: ProblemType[];
  style: string;
  subTaskList: ProblemSubTask[];
  languageLimitList: string[];
  customExample: string;
  customImplementation: string;
  customGrader: string;
  customNotes: string;
  customAttachment: string;
  customSample: string;
  problemSource: string;
};

export type ProblemSubTask = {
  order: number;
  title: string;
  content: string;
};

export type ProblemInputOutput = {
  order: number;
  input: string;
  output: string;
  content: string;
};
export type ProblemType =
  (typeof PROBLEM_TYPE_MAP)[keyof typeof PROBLEM_TYPE_MAP];

export type ProblemSort =
  (typeof PROBLEM_SORT_MAP)[keyof typeof PROBLEM_SORT_MAP];

export type TodayProblem = {
  uuid: string;
  title: string;
  level: number;
  levelText: string;
  answerRate: number;
  submitCount: number;
  answerCount: number;
  answerPeopleCount: number;
  source: string;
  sourceId: string;
  sourceUrl: string;
  typeList: ProblemType[];
  difficulty: string;
};
