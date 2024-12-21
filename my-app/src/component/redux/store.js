import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './MovieSlice'; // MovieSlice.js 경로 확인

const store = configureStore({
  reducer: {
    movies: movieReducer, // Redux 슬라이스 등록
  },
});

export default store;
