// src/App.js
import React from 'react';
import NowPlayingMovies from './component/NowPlayingMovies';
import Movie from './component/Movie';
import SearchMovies from './component/SearchMovie';

const App = () => {
  return (
    <div>
      <h1>Movie App</h1>
      {/*<Movie/>*/}
      <SearchMovies/>
    </div>
  );
};

export default App;
