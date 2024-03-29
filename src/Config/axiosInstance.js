import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosInstance.defaults.timeout = import.meta.env.API_TIME_OUT;

export default axiosInstance;