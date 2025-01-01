import React from 'react';
import { useAuth } from '../../context/auth-context';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Explore the latest blog posts from our community
          </p>
          {/* Blog posts feed will be added here */}
        </div>
      </main>
    </div>
  );
}