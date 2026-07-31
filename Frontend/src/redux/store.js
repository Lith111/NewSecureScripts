import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import progressReducer from "./slices/progressSlice"
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    progress:progressReducer,
    chat: chatReducer,
  },
});