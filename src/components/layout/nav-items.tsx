import { Home, FileText, Users, Tags, Settings } from 'lucide-react';

export const userNavItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/posts', label: 'Posts', icon: FileText },
];

export const adminNavItems = [
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/tags', label: 'Tags', icon: Tags },
];