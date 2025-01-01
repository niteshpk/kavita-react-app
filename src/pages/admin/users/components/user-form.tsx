import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { User, UserRole } from '../../../../types/auth';

const userFormSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin'] as const),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function UserForm({ user, onSubmit, onCancel, isSubmitting }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user ? {
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    } : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <Input
          id="username"
          {...register('username')}
          error={errors.username?.message}
          placeholder="e.g., johndoe"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Only letters, numbers, underscores, and hyphens allowed
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <Input
          id="name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="e.g., John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="e.g., john@example.com"
        />
      </div>

      {!user && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="Min. 6 characters"
          />
        </div>
      )}

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2">
          Role
        </label>
        <select
          id="role"
          {...register('role')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}