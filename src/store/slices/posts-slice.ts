import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PaginatedResponse } from '../../types/post';
import { PostsService } from '../../services/posts-service';

interface PostsState {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
  totalPosts: 0,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number = 1) => {
    const response = await PostsService.getPosts(page);
    return response;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.posts = data.list;
        state.currentPage = data.current_page;
        state.totalPages = Math.ceil(data.total / data.per_page);
        state.totalPosts = data.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;