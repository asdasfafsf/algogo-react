import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const getMe = async (): Promise<ApiResponse<Me>> => {
  const response: AxiosResponse<ApiResponse<Me>> = await apiClient.get('/api/v1/me');
  return response.data;
};

export const updateMe = async (requestUpdateMeDto: RequestUpdateMe): Promise<ApiResponse<Me>> => {
  const formData = new FormData();

  if (requestUpdateMeDto.file) {
    formData.append('file', requestUpdateMeDto.file);
  }
  if (requestUpdateMeDto.name) {
    formData.append('name', requestUpdateMeDto.name);
  }
  if (requestUpdateMeDto.socialList) {
    formData.append('socialList', JSON.stringify(requestUpdateMeDto.socialList));
  }

  const response: AxiosResponse<ApiResponse<Me>> = await apiClient.patch('/api/v1/me/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
