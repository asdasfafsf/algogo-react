import axios from 'axios';

const commonAxios = axios.create({
  baseURL: 'https://www.algogo.co.kr',
});

export default commonAxios;
