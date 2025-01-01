export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagData {
  name: string;
}