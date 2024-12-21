import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovieByTitle, clearSearchResult } from './redux/MovieSlice';
import { Container, Row, Form, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';
import NowPlayingMovies from './NowPlayingMovies';

const SearchMovie = () => {
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();
    const { nowPlayingMovies, searchResult } = useSelector((state) => state.movies);

    const handleSearch = () => {
        dispatch(searchMovieByTitle(searchInput));
    };
    const handleClear = () => {
        setSearchInput('');
        dispatch(clearSearchResult());
    }

    const moviesToDisplay = searchResult || nowPlayingMovies;

    return (
        <Container>
            <h1>영화 검색</h1>
            <Form className="d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="영화 제목을 입력하세요"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="me-2"
                />
                <Button variant="primary" onClick={handleSearch}>검색</Button>
                <Button variant="secondary" onClick={handleClear} className='ms-2'>초기화</Button>
            </Form>

            {moviesToDisplay && moviesToDisplay.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {moviesToDisplay.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Row>
            ) : (
                <>
                    {searchInput && <p>검색 결과가 없습니다.</p>}
                    <NowPlayingMovies />
                </>
            )}
        </Container>
    );
};

export default SearchMovie;