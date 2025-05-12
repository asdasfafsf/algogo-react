import { AxiosResponse } from 'axios';
import qs from 'qs';
import apiClient from './apiClient';
import { IquiryProblemsSummary, Problem, ProblemSummaryList } from '@/type/Problem.type';

type GetProblemList = (param: IquiryProblemsSummary) => Promise<ApiResponse<ProblemSummaryList>>;

export const getProblemList: GetProblemList = async (requestProblemListDto) => {
  const queryString = qs.stringify(requestProblemListDto, { arrayFormat: 'brackets' });
  const response: AxiosResponse<ApiResponse<ProblemSummaryList>> = await apiClient.get(`/api/v2/problems?${queryString}`);
  const problemList = response.data;
  return problemList;
};

export const getProblem = async (problemUuid: string): Promise<ApiResponse<Problem>> => {
  const response: AxiosResponse<ApiResponse<Problem>> = await apiClient.get(`/api/v2/problems/${problemUuid}`);
  const problem = response.data;
  return problem;
};
