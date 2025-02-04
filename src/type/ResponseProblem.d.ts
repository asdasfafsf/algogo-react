type ResponseProblemList = {
  problemList: ResponseProblem[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
};

type ResponseProblem = {
  uuid: string;
  title: string;
  level: number;
  levelText: string;
  input: string;
  output: string;
  hint: string;
  answerCount: number;
  answerRate: number;
  answerPeopleCount: number;
  submitCount: number;
  timeout: number;
  memoryLimit: number;
  source: string;
  sourceId: string;
  sourceUrl: string;
  updatedAt: Date;
  contentList: ResponseProblemContent[];
  inputOutputList: ResponseProblemInputOutput[];
  typeList: ResponseTypeList[];
};

type ResponseTypeList = {
  name: string;
};

type ResponseProblemContent = {
  order: number;
  type: 'image' | 'text'
  content: string;
};
type ResponseProblemInputOutput = {
  order: number;
  input: string;
  output: string;
};
