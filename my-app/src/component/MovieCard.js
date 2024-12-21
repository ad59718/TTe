import React from 'react';
import { Card, Col } from 'react-bootstrap';

const MovieCard = ({ movie }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>개봉일: {movie.release_date}</Card.Text>
        <Card.Text>평점: {movie.vote_average}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default MovieCard;