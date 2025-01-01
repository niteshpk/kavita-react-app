import React from 'react';
import { User } from '../../../types/auth';
import { Camera } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  isEditing: boolean;
  onEditClick: () => void;
}

export function ProfileHeader({ user, isEditing, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-t-lg" />
      <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-8 flex items-end justify-between">
        <div className="flex items-end space-x-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-700 border-4 border-background overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-1 rounded-full bg-primary text-primary-foreground">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={onEditClick}
            className="mb-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}