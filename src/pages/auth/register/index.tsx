import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useAuth } from '../../../context/auth-context';
import { AuthService } from '../../../services/auth-service';
import { registerSchema, type RegisterCredentials } from '../../../types/auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const response = await AuthService.register(data);
      if (response.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Registration failed:', error instanceof Error ? error.message : 'Unknown error');
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/90 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                {...register('username')}
                placeholder="Username"
                error={errors.username?.message}
              />
            </div>
            <div>
              <Input
                type="email"
                {...register('email')}
                placeholder="Email address"
                error={errors.email?.message}
              />
            </div>
            <div>
              <Input
                type="password"
                {...register('password')}
                placeholder="Password"
                error={errors.password?.message}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}