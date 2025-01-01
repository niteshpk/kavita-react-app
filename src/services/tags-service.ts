import { Tag, CreateTagData } from '../types/tag';

// Simulate database for tags
let mockTags: Tag[] = [
  { id: 1, name: "React", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, name: "TypeScript", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, name: "Frontend", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTags = [...mockTags, newTag];
    return newTag;
  }
};