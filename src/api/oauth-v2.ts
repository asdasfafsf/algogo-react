import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const oauthLoginV2 = async ({ provider, code }: { provider: string; code: string }) => {
  const response: AxiosResponse<ApiResponse<{ accessToken: string; refreshToken: string }>> = await apiClient.get(`api/v2/oauth/${provider}?code=${code}`);
  return response.data;
};
