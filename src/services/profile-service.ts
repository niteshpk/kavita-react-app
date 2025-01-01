import { UserProfile, ProfileFormData } from '../types/profile';
import api from '../lib/axios';

export const ProfileService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/profile');
    return response.data;
  },

  async updateProfile(data: ProfileFormData): Promise<UserProfile> {
    const response = await api.patch('/profile', data);
    return response.data;
  },

  async updateProfilePhoto(file: File): Promise<{ photoUrl: string }> {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.post('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};