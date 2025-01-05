// Update the createTag function
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
}

// Update the createPost function
async createPost(data: Partial<Post>): Promise<Post> {
  await delay(500);
  const newPost: Post = {
    id: posts.length + 1,
    author_id: 1,
    title: data.title!,
    body: data.body!,
    imageUrl: data.imageUrl,
    status: data.status || 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
}