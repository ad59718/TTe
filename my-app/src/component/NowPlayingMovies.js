import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNowPlayingMovies } from './redux/MovieSlice';
import { Row, Spinner } from 'react-bootstrap';
import MovieCard from './MovieCard';

const NowPlayingMovies = () => {
    const dispatch = useDispatch();
    const { nowPlayingMovies, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchNowPlayingMovies());
      }, [dispatch]);

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
      }
    
      if (error) {
        return <p className="text-danger">Error: {error}</p>;
      }
    
      return (
        <div>
          <h3>현재 상영 영화</h3>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {nowPlayingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Row>
        </div>
      );
}

export default NowPlayingMovies;