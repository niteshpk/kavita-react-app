import { Post } from "../types/post";
import api from "../lib/api";
import { postsResponse } from "../data/posts";

export const PostsService = {
  async getPosts(page: number = 1) {
    try {
      const response = await api.get("/posts", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      return postsResponse;
    }
  },

  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data.post;
  },

  async createPost(postData: Partial<Post>) {
    const response = await api.post("/posts", {
      author_id: postData.author_id,
      title: postData.title,
      body: postData.body,
      imageUrl: postData.imageUrl,
      status: postData.status || "published",
    });
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
