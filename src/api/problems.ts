import { AxiosResponse } from 'axios';
import qs from 'qs';
import apiClient from './apiClient';

type GetProblemList = (param: RequestProblemList) => Promise<ApiResponse<ResponseProblemList>>;

export const getProblemList: GetProblemList = async (requestProblemListDto) => {
  const queryString = qs.stringify(requestProblemListDto, { arrayFormat: 'brackets' });
  const response: AxiosResponse<ApiResponse<ResponseProblemList>> = await apiClient.get(`/api/v1/problems?${queryString}`);
  const problemList = response.data;
  return problemList;
};

export const getProblem = async (problemUuid: string): Promise<ApiResponse<ResponseProblem>> => {
  const response: AxiosResponse<ApiResponse<ResponseProblem>> = await apiClient.get(`/api/v1/problems/${problemUuid}`);
  const problem = response.data;
  return problem;
};

export const collectProblem = async (param: { url: string }): Promise<ApiResponse<string>> => {
  const response: AxiosResponse<ApiResponse<string>> = await apiClient.post('/api/v1/problems/collect', param);
  const uuid = response.data;
  return uuid;
};
