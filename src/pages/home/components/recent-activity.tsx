import React from 'react';
import { formatDate } from '../../../lib/utils';

export function RecentActivity() {
  const activities = [
    {
      type: 'post',
      title: 'Getting Started with React and TypeScript',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      type: 'comment',
      title: 'Great article! Thanks for sharing.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      type: 'like',
      title: 'Modern State Management with Redux Toolkit',
      date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    },
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {activity.type === 'post' && 'Created a new post'}
                {activity.type === 'comment' && 'Commented on a post'}
                {activity.type === 'like' && 'Liked a post'}
              </p>
            </div>
            <time className="text-sm text-muted-foreground">
              {formatDate(activity.date)}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}