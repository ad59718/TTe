import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNowPlayingMovies, searchMovieByTitle } from './redux/MovieSlice';

const SearchMovie = () => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const { movies, searchResult, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchNowPlayingMovies());
    }
  }, [dispatch, movies.length]);

  const handleSearch = () => {
    if (searchInput.trim() === '') return;
    dispatch(searchMovieByTitle(searchInput));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>영화 검색</h1>
      <input
        type="text"
        placeholder="영화 제목을 입력하세요"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginRight: '10px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>

      <div style={{ marginTop: '20px' }}>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: 'red' }}>에러: {error}</p>}

        {searchResult ? (
          searchResult.map((movie) => (
            <div key={movie.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
              <h3>{movie.title}</h3>
              <p>개봉일: {movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          ))
        ) : (
          <div>
            <h3>현재 상영 중인 영화</h3>
            {movies.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {movies.map((movie) => (
                  <div key={movie.id} style={{ width: '200px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                    <h4>{movie.title}</h4>
                    <p>개봉일: {movie.release_date}</p>
                    <p>평점: {movie.vote_average}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>영화 데이터를 불러오는 중...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovie;

