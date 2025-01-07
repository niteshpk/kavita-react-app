import { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: 1,
    author_id: 1,
    title: "Getting Started with React and TypeScript",
    body: "TypeScript is a powerful addition to React development. In this post, we'll explore how to set up a new React project with TypeScript and best practices for type-safe components...",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    status: "published",
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z",
    likes: 42,
    isLiked: false,
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Frontend" },
    ],
    author: {
      id: 1,
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    },
  },
  {
    id: 2,
    author_id: 2,
    title: "Modern State Management with Redux Toolkit",
    body: "Redux Toolkit has revolutionized how we handle state in React applications. Learn how to leverage its powerful features for cleaner and more maintainable code...",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    status: "published",
    created_at: "2024-03-09T15:30:00Z",
    updated_at: "2024-03-09T15:30:00Z",
    likes: 28,
    isLiked: true,
    tags: [
      { id: 1, name: "React" },
      { id: 4, name: "Redux" },
      { id: 5, name: "State Management" },
    ],
    author: {
      id: 2,
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
    },
  },
  {
    id: 3,
    author_id: 3,
    title: "Building Responsive Layouts with Tailwind CSS",
    body: "Tailwind CSS provides a utility-first approach to styling. Discover how to create beautiful, responsive layouts without writing custom CSS...",
    imageUrl:
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&auto=format&fit=crop",
    status: "published",
    created_at: "2024-03-08T09:15:00Z",
    updated_at: "2024-03-08T09:15:00Z",
    likes: 35,
    isLiked: false,
    tags: [
      { id: 6, name: "CSS" },
      { id: 7, name: "Tailwind" },
      { id: 8, name: "Design" },
    ],
    author: {
      id: 3,
      name: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop",
    },
  },
];
