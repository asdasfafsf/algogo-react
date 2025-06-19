import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const oauthLoginV2 = async ({ provider, code }: { provider: string; code: string }) => {
  const response: AxiosResponse<ApiResponse<{ accessToken: string; refreshToken: string }>> = await apiClient.post(`api/v2/oauth/${provider}?code=${code}`);
  return response.data;
};

export const oauthConnectV2 = async ({ provider, code }: { provider: string; code: string }) => {
  const response: AxiosResponse<ApiResponse<{ accessToken: string; refreshToken: string }>> = await apiClient.post(`api/v2/oauth/connect/${provider}?code=${code}`);
  return response.data;
};

export const oauthDisconnectV2 = async ({ provider, code }: { provider: string; code: string }) => {
  const response: AxiosResponse<ApiResponse<{ accessToken: string; refreshToken: string }>> = await apiClient.post(`api/v2/oauth/disconnect/${provider}?code=${code}`);
  return response.data;
};
