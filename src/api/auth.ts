import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const getToken = async (): Promise<ApiResponse<Token>> => {
  const response: AxiosResponse<ApiResponse<Token>> = await apiClient.get('/api/v1/auth/token');
  return response.data;
};

export const refresh = async ({ refreshToken }: { refreshToken: string })
: Promise<ApiResponse<Token>> => {
  const response: AxiosResponse<ApiResponse<Token>> = await apiClient.post('/api/v1/auth/refresh', { refreshToken });
  return response.data;
};
