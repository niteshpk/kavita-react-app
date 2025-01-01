import { useAuth as useAuthContext } from '../context/auth-context';

export function useAuth() {
  const auth = useAuthContext();
  
  const isAdmin = auth.user?.role === 'admin';
  
  return {
    ...auth,
    isAdmin,
  };
}