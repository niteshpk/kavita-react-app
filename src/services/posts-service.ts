import { Post, PaginatedResponse } from "../types/post";
import api from "../lib/api";

export const PostsService = {
  async getPosts(page: number = 1): Promise<PaginatedResponse<Post>> {
    const response = await api.get<PaginatedResponse<Post>>("/posts", {
      params: { page },
    });
    return response.data;
  },

  async getPost(id: number): Promise<Post | undefined> {
    const response = await api.get<{ success: boolean; data: Post }>(
      `/posts/${id}`
    );
    return response.data.data;
  },

  async createPost(post: Partial<Post>): Promise<Post> {
    const response = await api.post<{ success: boolean; data: Post }>(
      "/posts",
      post
    );
    return response.data.data;
  },

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    const response = await api.put<{ success: boolean; data: Post }>(
      `/posts/${id}`,
      post
    );
    return response.data.data;
  },

  async deletePost(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
  },
};
