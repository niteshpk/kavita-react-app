import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import postsReducer from './slices/posts-slice';
import tagsReducer from './slices/tags-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  tags: tagsReducer,
});