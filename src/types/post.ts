import { Tag } from "./tag";

export interface Post {
  id: number;
  author_id: number;
  title: string;
  body: string;
  photo_id?: number;
  imageUrl?: string;
  options?: Record<string, any>;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  user_has_liked: number;
  author: {
    id: number;
    uuid: string;
    username: string;
  };
  tags: Tag[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    current_page: number;
    per_page: number;
    total: number;
    list: T[];
  };
}
