import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const setOAuthCookie = async () => {
  const response: AxiosResponse<ApiResponse<boolean>> = await apiClient.get('api/v1/oauth/cookie');
  return response.data;
};

export const disconnectOAuth = async (provider: OAuthProvider) => {
  const response: AxiosResponse<ApiResponse<null>> = await apiClient.delete(`api/v1/oauth/${provider}`);
  return response.data;
};
