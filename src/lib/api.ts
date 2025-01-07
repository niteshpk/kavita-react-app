import axios from "axios";
import toast from "react-hot-toast";
import { handleError, isAuthError } from "./error-handler";
import { AuthService, TOKEN_KEY } from "../services/auth-service";

// Create API instance with base configuration
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", handleError(error));
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors
    if (isAuthError(error)) {
      // Don't show toast for auth endpoints
      const isAuthEndpoint = error.config?.url?.match(
        /\/(login|register|forgot-password)/
      );
      if (!isAuthEndpoint) {
        AuthService.logout();
        // Use window.location to ensure full page reload and state reset
        window.location.href = "/login";
        toast.error("Session expired. Please login again.");
      }
    } else {
      // Handle other errors
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        handleError(error);
      console.log(message);
    }

    return Promise.reject(error);
  }
);

export default api;
