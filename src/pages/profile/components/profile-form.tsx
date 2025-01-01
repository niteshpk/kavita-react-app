import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { ProfileFormData } from '../../../types/profile';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  email: z.string().email('Invalid email address'),
});

interface ProfileFormProps {
  initialData: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ProfileForm({ initialData, onSubmit, isSubmitting }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </div>

        <div>
          <label htmlFor="middleName" className="block text-sm font-medium mb-2">
            Middle Name (Optional)
          </label>
          <Input
            id="middleName"
            {...register('middleName')}
            error={errors.middleName?.message}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium mb-2">
            Mobile Number
          </label>
          <Input
            id="mobileNumber"
            type="tel"
            {...register('mobileNumber')}
            error={errors.mobileNumber?.message}
            placeholder="1234567890"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}