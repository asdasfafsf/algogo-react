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

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return error.response;
    }
    return { statusCode: error.statusCode, errorCode: '9999', errorMessage: '정의되지 않은 오류가 발생하였습니다.' };
  },
);

export default apiClient;
