import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// createAsyncThunk로 비동기 작업을 처리할 수 있도록 함
export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async (_, thunkAPI) => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg2Y2JjYTkwZjhkYjJhNmJjNTlhYTU1MTMxY2E4OCIsIm5iZiI6MTczNDc2MDU0NC40NTI5OTk4LCJzdWIiOiI2NzY2NTg2MDhjYTUzY2M2YTc1ZTA4MjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RdwyecsrEBt67CkwShVQaNday5HOE7ai7QcSW2Xg94g',
      },
    };

    try {
      const response = await axios(url, options);
      return response.data.results; // 영화 데이터 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // 오류 처리
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], // 모든 영화 데이터
    loading: false,
    error: null,
    searchResult: null, // 검색 결과 저장
  },
  reducers: {
    // Search 리듀서
    searchMovieByTitle: (state, action) => {
      const searchTitle = action.payload.toLowerCase(); // 검색어를 소문자로 변환
      const movie = state.movies.find((movie) =>
        movie.title.toLowerCase() === searchTitle
      );
      state.searchResult = movie || null; // 검색된 영화 저장 (없으면 null)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null; // 에러 초기화
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; // API 응답 데이터를 상태에 저장
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 오류 메시지 상태 저장
      });
  },
});

export const { searchMovieByTitle } = movieSlice.actions; // Search 리듀서 액션 내보내기
export default movieSlice.reducer;
