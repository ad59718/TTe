import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './redux/MovieSlice';

// 스토어 설정
const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
