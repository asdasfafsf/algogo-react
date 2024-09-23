import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const getProblemList = async (): Promise<ApiResponse<ResponseProblem[]>> => {
  const response: AxiosResponse<ApiResponse<ResponseProblem[]>> = await apiClient.get('/api/v1/problems');
  const problemList = response.data;
  return problemList;
};

export const getProblem = async (problemUuid: string): Promise<ApiResponse<ResponseProblem>> => {
  const response: AxiosResponse<ApiResponse<ResponseProblem>> = await apiClient.get(`/api/v1/problems/${problemUuid}`);
  const problem = response.data;
  return problem;
};
