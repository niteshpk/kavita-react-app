import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../types/profile';
import { ProfileService } from '../../services/profile-service';
import { ProfilePhoto } from './components/profile-photo';
import { ProfileForm } from './components/profile-form';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const updatedProfile = await ProfileService.updateProfile(data);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpdate = (photoUrl: string) => {
    if (profile) {
      setProfile({ ...profile, photoUrl });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-lg text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <ProfilePhoto
            photoUrl={profile.photoUrl}
            name={profile.firstName || ''}
            onPhotoUpdate={handlePhotoUpdate}
          />
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold">
              {[profile.firstName, profile.middleName, profile.lastName]
                .filter(Boolean)
                .join(' ')}
            </h1>
            <p className="text-muted-foreground">
              Status: {profile.status}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          <ProfileForm
            initialData={{
              firstName: profile.firstName || '',
              middleName: profile.middleName,
              lastName: profile.lastName || '',
              mobileNumber: profile.mobileNumber || '',
              email: profile.email || '',
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}