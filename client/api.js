import axios from "axios";
import { setAccessToken, getAccessToken } from "./utils/tokenStore";

const api = axios.create({
  baseURL: ``,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await axios.post(
        `/api/v1/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      setAccessToken(res.data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

      return api(originalRequest); // retry request
    }
    return Promise.reject(error);
  }
);

export default api;
