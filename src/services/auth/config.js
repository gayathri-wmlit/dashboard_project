import axios from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
);

export default axiosInstance;
