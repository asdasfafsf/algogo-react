import axios from 'axios';
import { showAlert } from '@plugins/modal/ModalProvider';

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
  // if (!config.headers.Authorization) {
  if (config.url?.includes('/api/v2/auth/refresh')) {
    return config;
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = undefined;
  }
  // }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const data = error.response?.data;
    const { config } = error;

    if (data?.statusCode === 401 && (data?.errorCode === 'JWT_EXPIRED' || data?.errorMessage?.includes('만료'))) {
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
        const { data: refreshResponse } = await axios.post(
          '/api/v2/auth/refresh',
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );

        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        failedQueue.forEach(({ resolve }) => resolve());
        failedQueue.length = 0;

        return await apiClient.request(config);
      } catch (refreshError) {
        failedQueue.forEach(({ reject }) => reject());
        failedQueue.length = 0;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('me');
        if (showAlert) {
          await showAlert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
        }
        window.location.href = `/login?destination=${window.location.pathname}`;
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return error.response;
  },
);

export default apiClient;
