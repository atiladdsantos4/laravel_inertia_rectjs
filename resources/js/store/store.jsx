import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // fora do brackets para customizar o nome //

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
