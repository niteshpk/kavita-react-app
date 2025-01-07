import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PaginatedResponse } from "../../types/post";
import { PostsService } from "../../services/posts-service";
import { handleError } from "../../lib/error-handler";

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
  "posts/fetchPosts",
  async (page: number = 1) => {
    const response = await PostsService.getPosts(page);
    return response;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: Partial<Post>) => {
    try {
      const response = await PostsService.createPost(postData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts cases
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
        state.error = action.error.message || "Failed to fetch posts";
      })
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
        state.totalPosts += 1;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create post";
      });
  },
});

export default postsSlice.reducer;
