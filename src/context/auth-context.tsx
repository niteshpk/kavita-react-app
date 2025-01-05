import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import { AuthService } from '../services/auth-service';
import { handleError } from '../lib/error-handler';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = AuthService.getToken();
      if (token) {
        try {
          // TODO: Implement token validation/refresh logic
          setLoading(false);
        } catch (error) {
          AuthService.removeToken();
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    try {
      AuthService.setToken(token);
      setUser(userData);
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Login error:', handleError(error));
    }
  };

  const logout = () => {
    try {
      AuthService.removeToken();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', handleError(error));
    }
  };

  const updateUser = (updatedUser: User) => {
    try {
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', handleError(error));
    }
  };

  const isAdmin = user?.roles?.includes('admin') ?? false;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAdmin,
      login, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}