import { Post } from "../types/post";
import api from "../lib/api";

export const PostsService = {
  async getPosts(page: number = 1) {
    const response = await api.get("/posts", {
      params: { page },
    });
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data.post;
  },

  async createPost(post: Partial<Post>) {
    const response = await api.post("/posts", post);
    return response.data;
  },

  async updatePost(id: number, post: Partial<Post>) {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },

  async deletePost(id: number) {
    await api.delete(`/posts/${id}`);
  },
};
