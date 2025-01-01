import { User } from '../types/auth';
import { Post } from '../types/post';
import { Tag } from '../types/tag';
import { UserProfile } from '../types/profile';
import { mockUsers } from '../data/mock-users';
import { mockPosts } from '../data/mock-posts';
import { delay } from '../lib/utils';

// In-memory storage
let users = [...mockUsers];
let posts = [...mockPosts];
let tags = [
  { id: 1, name: "React", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, name: "TypeScript", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, name: "Frontend", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

// Mock profiles storage
const profiles = new Map<string, UserProfile>();

export const AdminService = {
  // Users
  async getUsers(): Promise<User[]> {
    await delay(500);
    return users;
  },

  async createUser(data: Partial<User>): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: String(users.length + 1),
      username: data.username!,
      email: data.email!,
      name: data.name!,
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await delay(500);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    const updatedUser = { ...users[index], ...data };
    users[index] = updatedUser;
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    users = users.filter(user => user.id !== id);
    profiles.delete(id);
  },

  // Posts
  async getPosts(): Promise<Post[]> {
    await delay(500);
    return posts;
  },

  async createPost(data: Partial<Post>): Promise<Post> {
    await delay(500);
    const newPost: Post = {
      id: posts.length + 1,
      author_id: 1,
      title: data.title!,
      body: data.body!,
      imageUrl: data.imageUrl,
      status: data.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
      likes: 0,
      isLiked: false,
      author: {
        id: 1,
        name: "Current User",
        avatar: undefined
      }
    };
    posts = [newPost, ...posts];
    return newPost;
  },

  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    await delay(500);
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) throw new Error('Post not found');
    
    const updatedPost = { 
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    posts[index] = updatedPost;
    return updatedPost;
  },

  async deletePost(id: number): Promise<void> {
    await delay(500);
    posts = posts.filter(post => post.id !== id);
  },

  // Tags
  async getTags(): Promise<Tag[]> {
    await delay(500);
    return tags;
  },

  async createTag(data: Partial<Tag>): Promise<Tag> {
    await delay(500);
    const newTag: Tag = {
      id: tags.length + 1,
      name: data.name!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tags = [...tags, newTag];
    return newTag;
  },

  async updateTag(id: number, data: Partial<Tag>): Promise<Tag> {
    await delay(500);
    const index = tags.findIndex(tag => tag.id === id);
    if (index === -1) throw new Error('Tag not found');
    
    const updatedTag = { ...tags[index], ...data };
    tags[index] = updatedTag;
    return updatedTag;
  },

  async deleteTag(id: number): Promise<void> {
    await delay(500);
    tags = tags.filter(tag => tag.id !== id);
  },

  // User Profiles
  async getUserProfile(userId: string): Promise<UserProfile> {
    await delay(500);
    let profile = profiles.get(userId);
    
    if (!profile) {
      profile = {
        id: `profile-${userId}`,
        userId,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      profiles.set(userId, profile);
    }
    
    return profile;
  },

  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    await delay(500);
    let profile = await this.getUserProfile(userId);
    
    profile = {
      ...profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    profiles.set(userId, profile);
    return profile;
  }
};