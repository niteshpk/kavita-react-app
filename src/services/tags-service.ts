import { Tag, CreateTagData } from "../types/tag";

// Simulate database for tags
let mockTags: Tag[] = [
  {
    id: 1,
    name: "React",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "TypeScript",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Frontend",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TagsService = {
  async getTags(): Promise<Tag[]> {
    await delay(500);
    return mockTags;
  },

  async createTag(data: CreateTagData): Promise<Tag> {
    await delay(800);
    const newTag: Tag = {
      id: mockTags.length + 1,
      name: data.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockTags = [...mockTags, newTag];
    return newTag;
  },
};
