import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { User } from '../../../../types/auth';
import { UserProfile, ProfileStatus } from '../../../../types/profile';

const profileSchema = z.object({
  status: z.enum(['active', 'inactive', 'pending'] as const),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal('')),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/).optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  occupation: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileDialogProps {
  isOpen: boolean;
  user: User;
  profile?: UserProfile;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ProfileDialog({ 
  isOpen, 
  user, 
  profile, 
  onClose, 
  onSubmit, 
  isSubmitting 
}: ProfileDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {
      status: 'active',
      socialLinks: {},
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <p className="text-sm text-muted-foreground">
              Managing profile for {user.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                id="status"
                {...register('status')}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location
              </label>
              <Input
                id="location"
                {...register('location')}
                error={errors.location?.message}
                placeholder="City, Country"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Website
              </label>
              <Input
                id="website"
                type="url"
                {...register('website')}
                error={errors.website?.message}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium mb-2">
                Occupation
              </label>
              <Input
                id="occupation"
                {...register('occupation')}
                error={errors.occupation?.message}
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <Input
                id="company"
                {...register('company')}
                error={errors.company?.message}
                placeholder="Company Name"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                  Twitter
                </label>
                <Input
                  id="twitter"
                  type="url"
                  {...register('socialLinks.twitter')}
                  error={errors.socialLinks?.twitter?.message}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                  LinkedIn
                </label>
                <Input
                  id="linkedin"
                  type="url"
                  {...register('socialLinks.linkedin')}
                  error={errors.socialLinks?.linkedin?.message}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label htmlFor="github" className="block text-sm font-medium mb-2">
                  GitHub
                </label>
                <Input
                  id="github"
                  type="url"
                  {...register('socialLinks.github')}
                  error={errors.socialLinks?.github?.message}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}