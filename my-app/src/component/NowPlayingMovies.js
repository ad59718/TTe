// src/component/NowPlayingMovies.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlayingMovies } from './redux/MovieSlice';

const NowPlayingMovies = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies()); // 컴포넌트 마운트 시 영화 데이터 불러오기
  }, [dispatch]);

  return (
    <div>
      <h1>Now Playing Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </li>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </ul>
    </div>
  );
};

export default NowPlayingMovies;
