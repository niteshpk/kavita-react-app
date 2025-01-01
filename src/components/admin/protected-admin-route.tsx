import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}