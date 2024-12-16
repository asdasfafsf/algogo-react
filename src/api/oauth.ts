import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const setOAuthCookie = async () => {
  const response: AxiosResponse<ApiResponse<boolean>> = await apiClient.get('/v1/oauth/cookie');
  return response.data;
};
