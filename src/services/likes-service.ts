const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const LikesService = {
  async likePost(postId: number): Promise<void> {
    await delay(300);
    // Simulated API call
  },

  async unlikePost(postId: number): Promise<void> {
    await delay(300);
    // Simulated API call
  }
};