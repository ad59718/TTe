import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg2Y2JjYTkwZjhkYjJhNmJjNTlhYTU1MTMxY2E4OCIsIm5iZiI6MTczNDc2MDU0NC40NTI5OTk4LCJzdWIiOiI2NzY2NTg2MDhjYTUzY2M2YTc1ZTA4MjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RdwyecsrEBt67CkwShVQaNday5HOE7ai7QcSW2Xg94g';

// 현재 상영 영화 가져오기
export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 모든 영화 가져오기 (페이지네이션 포함)
export const fetchAllMovies = createAsyncThunk(
  'movies/fetchAll',
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: [],
    allMovies: [],
    loading: false,
    error: null,
    searchResult: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    searchMovieByTitle: (state, action) => {
      const searchTitle = action.payload.toLowerCase();
      const targetMovies = state.searchResult ? state.searchResult : state.nowPlayingMovies;
      state.searchResult = targetMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTitle)
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearchResult: (state) => {
      state.searchResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlayingMovies = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchMovieByTitle, setCurrentPage, clearSearchResult } = movieSlice.actions;
export default movieSlice.reducer;