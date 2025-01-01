import { z } from 'zod';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  createdAt: string;
}

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;