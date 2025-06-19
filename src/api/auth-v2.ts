import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const refresh = async (): Promise<ApiResponse<Token>> => {
  const response: AxiosResponse<ApiResponse<Token>> = await apiClient.post(
    '/api/v2/auth/refresh',
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
  );
  return response.data;
};
