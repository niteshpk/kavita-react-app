import { User } from "../types/auth";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "2",
    username: "johndoe",
    email: "john@example.com",
    name: "John Doe",
    role: "user",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop",
    created_at: "2024-03-02T00:00:00Z",
  },
  {
    id: "3",
    username: "janesmith",
    email: "jane@example.com",
    name: "Jane Smith",
    role: "user",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    created_at: "2024-03-03T00:00:00Z",
  },
];
