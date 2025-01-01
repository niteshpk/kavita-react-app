import React from 'react';
import { AppLayout } from './components/layout/app-layout';

const HomePage = React.lazy(() => import('./pages/home'));
const PostsPage = React.lazy(() => import('./pages/posts'));
const PostDetailPage = React.lazy(() => import('./pages/posts/[id]'));
const CreatePostPage = React.lazy(() => import('./pages/posts/create'));
const ProfilePage = React.lazy(() => import('./pages/profile'));

export const AppRoutes = [
  {
    path: '/home',
    element: <AppLayout><HomePage /></AppLayout>
  },
  {
    path: '/posts',
    element: <AppLayout><PostsPage /></AppLayout>
  },
  {
    path: '/posts/:id',
    element: <AppLayout><PostDetailPage /></AppLayout>
  },
  {
    path: '/posts/create',
    element: <AppLayout><CreatePostPage /></AppLayout>
  },
  {
    path: '/profile',
    element: <AppLayout><ProfilePage /></AppLayout>
  }
];