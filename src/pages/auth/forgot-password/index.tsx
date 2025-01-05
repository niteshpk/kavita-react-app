import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { AuthService } from '../../../services/auth-service';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await AuthService.forgotPassword(data.email);
      if (response.success) {
        toast.success('Password reset instructions have been sent to your email');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Forgot password request failed:', error instanceof Error ? error.message : 'Unknown error');
      toast.error('Failed to process request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Forgot password?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <Input
              type="email"
              {...register('email')}
              placeholder="Email address"
              error={errors.email?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Send reset instructions
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-primary hover:text-primary/90"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}