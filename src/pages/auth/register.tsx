import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import api from '../../lib/axios';
import { useAuth } from '../../context/auth-context';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/90 font-medium underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Full name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
                {...register('email')}
                error={errors.email?.message}
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