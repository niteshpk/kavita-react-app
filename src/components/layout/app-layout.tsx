import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}