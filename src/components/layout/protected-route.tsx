import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { LoadingSpinner } from '../ui/loading-spinner';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}