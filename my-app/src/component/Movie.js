import React from 'react';
import { dummy } from './movieDummy';

const Movie = () => {
    return (
        <div>
            <h1>영화 목록</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {dummy.results.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            maxWidth: '200px',
                            textAlign: 'center',
                        }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            style={{ borderRadius: '8px', width: '100%' }}
                        />
                        <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{movie.title}</h3>
                        <p style={{ fontSize: '0.9em', color: '#666' }}>
                            개봉일: {movie.release_date}
                        </p>
                        <p style={{ fontSize: '0.9em', color: '#666' }}>
                            평점: {movie.vote_average} / 10
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movie;

