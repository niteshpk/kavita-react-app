import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { loginSchema, type LoginCredentials } from '../../../types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
  isSubmitting: boolean;
}

export function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_or_username: '',
      password: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            {...register('email_or_username')}
            type="text"
            placeholder="Email or username"
            autoComplete="username"
            error={errors.email_or_username?.message}
          />
        </div>
        <div>
          <Input
            type="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:text-primary/90"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Sign in
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        By signing in, you agree to our{' '}
        <Link to="/terms" className="text-primary hover:text-primary/90">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-primary hover:text-primary/90">
          Privacy Policy
        </Link>
      </div>
    </form>
  );
}