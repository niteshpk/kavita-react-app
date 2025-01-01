import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import api from '../lib/axios';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user
const mockAdminUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
  createdAt: new Date().toISOString()
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockAdminUser); // Set mock admin user
  const [loading, setLoading] = useState(false);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setUser(user);
    toast.success('Welcome back!');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
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