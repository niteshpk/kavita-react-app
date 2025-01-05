import api from "../lib/api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "../types/auth";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/login", credentials);
    if (response.data.success) {
      this.setToken(response.data.data.token);
      this.setUser(response.data.data.user);
    }
    return response.data;
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/register", data);
    if (response.data.success) {
      this.setToken(response.data.data.token);
      this.setUser(response.data.data.user);
    }
    return response.data;
  },

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
