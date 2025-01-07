import { z } from "zod";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
  uuid?: string;
  roles: UserRole[];
  status: "active" | "inactive" | "pending";
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  error?: boolean;
  message?: string;
  data?: {
    token: string;
    user: User;
  };
}

export const loginSchema = z.object({
  email_or_username: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
