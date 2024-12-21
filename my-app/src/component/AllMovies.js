import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies, setCurrentPage } from './redux/MovieSlice';
import { Container, Pagination, Row, Spinner, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';

const AllMovies = () => {
  const dispatch = useDispatch();
  const { allMovies, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchAllMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const paginationItems = [];
    if (totalPages <= 10) {
        for (let number = 1; number <= totalPages; number++) {
            paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>,
            );
        }
    } else {
        let startPage = Math.max(1, currentPage - 5);
        let endPage = Math.min(totalPages, currentPage + 5);
        if (endPage - startPage < 9) {
            if (currentPage < 6) {
                endPage = Math.min(10, totalPages)
            } else {
                startPage = Math.max(1, totalPages - 9)
            }
        }
        if (startPage > 1) {
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
        }
        for (let number = startPage; number <= endPage; number++) {
            paginationItems.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        if (endPage < totalPages) {
            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
        }
    }



  return (
    <Container>
      <h3>모든 영화</h3>
      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <p className="text-danger">Error: {error}</p>}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {allMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}/>
        {paginationItems}
        <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}/>
      </Pagination> 
    </Container>
  );
};

export default AllMovies;