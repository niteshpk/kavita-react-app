import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/auth-context';
import { ProtectedRoute } from './components/layout/protected-route';
import { ProtectedAdminRoute } from './components/admin/protected-admin-route';
import { AppLayout } from './components/layout/app-layout';
import { LoadingSpinner } from './components/ui/loading-spinner';

// Auth pages
const LoginPage = React.lazy(() => import('./pages/auth/login'));
const RegisterPage = React.lazy(() => import('./pages/auth/register'));
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/forgot-password'));

// User pages
const HomePage = React.lazy(() => import('./pages/home'));
const PostsPage = React.lazy(() => import('./pages/posts'));
const PostDetailPage = React.lazy(() => import('./pages/posts/[id]'));
const ProfilePage = React.lazy(() => import('./pages/profile'));

// Admin pages
const AdminUsersPage = React.lazy(() => import('./pages/admin/users'));
const AdminPostsPage = React.lazy(() => import('./pages/admin/posts/index'));
const AdminTagsPage = React.lazy(() => import('./pages/admin/tags'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <LoginPage />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<LoadingSpinner />}>
              <RegisterPage />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ForgotPasswordPage />
            </Suspense>
          } />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/home" replace />} />
            
            {/* User routes */}
            <Route path="home" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            } />
            <Route path="posts" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PostsPage />
              </Suspense>
            } />
            <Route path="posts/:id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PostDetailPage />
              </Suspense>
            } />
            <Route path="profile" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProfilePage />
              </Suspense>
            } />

            {/* Admin routes */}
            <Route path="admin" element={<ProtectedAdminRoute><Outlet /></ProtectedAdminRoute>}>
              <Route path="users" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminUsersPage />
                </Suspense>
              } />
              <Route path="posts" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminPostsPage />
                </Suspense>
              } />
              <Route path="tags" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminTagsPage />
                </Suspense>
              } />
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;