import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const getMe = async (): Promise<ApiResponse<Me>> => {
  const response: AxiosResponse<ApiResponse<Me>> = await apiClient.get('/api/v1/me');
  return response.data;
};
