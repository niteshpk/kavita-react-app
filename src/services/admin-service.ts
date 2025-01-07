import { User } from "../types/auth";
import { Post } from "../types/post";
import { Tag } from "../types/tag";
import { UserProfile } from "../types/profile";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data storage
let users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    username: "admin",
    name: "Admin User",
    roles: ["admin"],
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    username: "user",
    name: "Regular User",
    roles: ["user"],
    status: "active",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
];

let posts: Post[] = [];
let tags: Tag[] = [];
const profiles = new Map<string, UserProfile>();

export const AdminService = {
  // User Management
  async getUsers(): Promise<User[]> {
    await delay(500);
    return users;
  },

  async createUser(data: Partial<User>): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: String(Date.now()),
      email: data.email!,
      username: data.username!,
      name: data.name!,
      role: data.role || "user",
      status: data.status || "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await delay(500);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");

    const updatedUser = {
      ...users[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    users[index] = updatedUser;
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    users = users.filter((user) => user.id !== id);
    profiles.delete(id);
  },

  // User Profile Management
  async getUserProfile(userId: string): Promise<UserProfile> {
    await delay(500);
    let profile = profiles.get(userId);

    if (!profile) {
      profile = {
        id: `profile-${userId}`,
        userId,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      profiles.set(userId, profile);
    }

    return profile;
  },

  async updateUserProfile(
    userId: string,
    data: Partial<UserProfile>
  ): Promise<UserProfile> {
    await delay(500);
    let profile = await this.getUserProfile(userId);

    profile = {
      ...profile,
      ...data,
      updated_at: new Date().toISOString(),
    };

    profiles.set(userId, profile);
    return profile;
  },

  // Post Management
  async getPosts(): Promise<Post[]> {
    await delay(500);
    return posts;
  },

  async createPost(data: Partial<Post>): Promise<Post> {
    await delay(500);
    const newPost: Post = {
      id: posts.length + 1,
      author_id: Number(data.author_id),
      title: data.title!,
      body: data.body!,
      imageUrl: data.imageUrl,
      status: data.status || "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_has_liked: 0,
      author: {
        id: Number(data.author_id),
        uuid: "generated-uuid",
        username: "current-user",
      },
      tags: data.tags || [],
    };
    posts = [newPost, ...posts];
    return newPost;
  },

  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    await delay(500);
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) throw new Error("Post not found");

    const updatedPost = {
      ...posts[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    posts[index] = updatedPost;
    return updatedPost;
  },

  async deletePost(id: number): Promise<void> {
    await delay(500);
    posts = posts.filter((post) => post.id !== id);
  },

  // Tag Management
  async getTags(): Promise<Tag[]> {
    await delay(500);
    return tags;
  },

  async createTag(data: Partial<Tag>): Promise<Tag> {
    await delay(500);
    const newTag: Tag = {
      id: tags.length + 1,
      name: data.name!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tags = [...tags, newTag];
    return newTag;
  },

  async updateTag(id: number, data: Partial<Tag>): Promise<Tag> {
    await delay(500);
    const index = tags.findIndex((tag) => tag.id === id);
    if (index === -1) throw new Error("Tag not found");

    const updatedTag = {
      ...tags[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    tags[index] = updatedTag;
    return updatedTag;
  },

  async deleteTag(id: number): Promise<void> {
    await delay(500);
    tags = tags.filter((tag) => tag.id !== id);
  },
};
