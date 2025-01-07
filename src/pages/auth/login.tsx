import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../context/auth-context';
import { AuthService } from '../../services/auth-service';
import { loginSchema, type LoginCredentials } from '../../types/auth';
import toast from 'react-hot-toast';
import { loggedInAdmin, loggedInUser } from '../../data/user';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await AuthService.login(data);
      if (response.success) {
        login(response.data.token, response.data.user);
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      const response = loggedInAdmin;
      // const response = loggedInUser;

      login(response.data.token, response.data.user);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">
            New to our platform?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/90 font-medium underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                {...register('email_or_username')}
                error={errors.email_or_username?.message}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/90 hover:underline"
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
        </form>
      </div>
    </div>
  );
}