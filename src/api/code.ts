import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const saveCode = async (saveCode: RequestSaveCode) => {
  const response: AxiosResponse<ApiResponse<null>> = await apiClient.put('/api/v1/code/problem', saveCode);
  return response.data;
};

export const loadCode = async (problemUuid: string, language: Language) => {
  const response: AxiosResponse<ApiResponse<ResponseCode>> = await apiClient.get(`/api/v1/code/problem/${problemUuid}?language=${encodeURIComponent(language)}`);
  return response.data;
};

export const getSetting = async () => {
  const response: AxiosResponse<ApiResponse<ResponseSetting>> = await apiClient.get('/api/v1/code/setting');
  return response.data;
};

export const setSetting = async (setting: RequestSetting) => {
  const response: AxiosResponse<ApiResponse<null>> = await apiClient.put('/api/v1/code/setting', setting);
  return response.data;
};
