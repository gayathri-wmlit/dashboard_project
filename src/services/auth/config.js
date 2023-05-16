import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://devapi.agnicart.com/api' });

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
);

export default axiosInstance;
