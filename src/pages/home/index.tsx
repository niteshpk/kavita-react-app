import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { UserStats } from './components/user-stats';
import { RecentActivity } from './components/recent-activity';
import { WelcomeMessage } from './components/welcome-message';

export default function HomePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <WelcomeMessage user={user} />
      <UserStats />
      <RecentActivity />
    </div>
  );
}