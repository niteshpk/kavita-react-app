export type ProfileStatus = "active" | "inactive" | "pending";

export interface UserProfile {
  id: string;
  userId: string;
  status: ProfileStatus;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  occupation?: string;
  company?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProfileFormData {
  status: ProfileStatus;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  occupation?: string;
  company?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
