import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag, CreateTagData } from '../../types/tag';
import { TagsService } from '../../services/tags-service';

interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  return await TagsService.getTags();
});

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (tagData: CreateTagData) => {
    return await TagsService.createTag(tagData);
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tags';
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      });
  },
});

export default tagsSlice.reducer;