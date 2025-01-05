import api from "../lib/api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/login", credentials);
    return response.data;
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
  },

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  removeToken(): void {
    localStorage.removeItem("token");
  },
};
