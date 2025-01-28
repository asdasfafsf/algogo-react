import axios from 'axios';

const { VITE_ENV } = import.meta.env;
const baseURL = VITE_ENV === 'development' ? 'http://localhost:3001' : 'https://www.algogo.co.kr';
const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
const withCredentials = VITE_ENV === 'development';

const apiClient = axios.create({
  baseURL,
  headers,
  withCredentials,
});

let isRefreshing = false;
const failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: ApiResponse<unknown>) => void;
}[] = [];

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const data = error.response?.data;
    const config = error.config;

    if (data?.statusCode === 401 && data?.errorMessage.includes('만료')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient.request(config))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        failedQueue.forEach(({ reject }) => reject(error));
        failedQueue.length = 0;
        isRefreshing = false;
        return Promise.resolve({
          status: 401,
          errorCode: 'UNAUTHORIZED',
          errorMessage: 'refreshToken이 없습니다.',
          data: null,
        });
      }

      try {
        const { data: refreshResponse } = await apiClient.post('/api/v1/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        failedQueue.forEach(({ resolve }) => resolve());
        failedQueue.length = 0;

        return await apiClient.request(config);
      } catch (refreshError) {
        failedQueue.forEach(({ reject }) => reject());
        failedQueue.length = 0;
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return error.response;
  },
);

export default apiClient;
