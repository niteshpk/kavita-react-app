import { Tag } from './tag';

export interface Post {
  id: number;
  author_id: number;
  title: string;
  body: string;
  imageUrl?: string;
  options?: Record<string, any>;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: number;
  isLiked: boolean;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}