import React from 'react';
import { Camera } from 'lucide-react';
import { ProfileService } from '../../../services/profile-service';
import toast from 'react-hot-toast';

interface ProfilePhotoProps {
  photoUrl?: string;
  name: string;
  onPhotoUpdate: (url: string) => void;
}

export function ProfilePhoto({ photoUrl, name, onPhotoUpdate }: ProfilePhotoProps) {
  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { photoUrl } = await ProfileService.updateProfilePhoto(file);
      onPhotoUpdate(photoUrl);
      toast.success('Profile photo updated successfully');
    } catch (error) {
      console.error('Failed to update profile photo:', error);
    }
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <label
        htmlFor="photo-upload"
        className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
      >
        <Camera className="w-5 h-5" />
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </label>
    </div>
  );
}