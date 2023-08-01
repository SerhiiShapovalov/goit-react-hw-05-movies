import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/ThemoviedbApi';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies()
      .then(movies => setMovies(movies))
      .catch(error => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
