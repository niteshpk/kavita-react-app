import { Post } from '../types/post';
import { mockPosts } from '../data/mock-posts';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PostsService = {
  async getPosts(): Promise<Post[]> {
    await delay(800); // Simulate network delay
    return mockPosts;
  },

  async getPost(id: number): Promise<Post | undefined> {
    await delay(500);
    return mockPosts.find(post => post.id === id);
  },

  async createPost(post: Partial<Post>): Promise<Post> {
    await delay(1000);
    const newPost: Post = {
      id: mockPosts.length + 1,
      author_id: 1, // Current user ID
      title: post.title!,
      body: post.body!,
      imageUrl: post.imageUrl,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: 1,
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop"
      }
    };
    mockPosts.unshift(newPost);
    return newPost;
  }
};