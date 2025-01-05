import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../../hooks/use-auth';
import { AuthService } from '../../../services/auth-service';
import { LoginForm } from './login-form';
import { type LoginCredentials } from '../../../types/auth';
import { handleError } from '../../../lib/error-handler';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: LoginCredentials) => {
    setIsSubmitting(true);
    try {
      const response = await AuthService.login(data);
      if (response.success) {
        login(response.data.token, response.data.user);
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
        toast.success('Welcome back!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Login failed:', handleError(error));
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New to our platform?{' '}
            <Link 
              to="/register" 
              className="text-primary hover:text-primary/90 font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>

        <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}