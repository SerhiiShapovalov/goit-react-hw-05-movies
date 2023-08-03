import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { getTrendingMovies } from 'services/ThemoviedbApi';
import MoviesList from '../components/MoviesList';

export default function Home() {
  const [status, setStatus] = useState('PENDING');
  const [trendingMovie, setTrendingMovie] = useState([]);

  useEffect(() => {
    getTrendingMovies()
      .then(resp => {
        setStatus('RESOLVED');
        if (Array.isArray(resp.results)) {
          setTrendingMovie([...resp.results]);
        } else {
          setTrendingMovie([]);
        }
      })
      .catch(error => {
        console.error(error);
        setStatus('REJECTED');
      });
  }, []);

  if (status === 'PENDING') {
    return <p>Loading...</p>;
  }
  if (status === 'REJECTED') {
    return <p>Failed to fetch data</p>;
  }
  if (status === 'RESOLVED') {
    return <MoviesList searchResult={trendingMovie} />;
  }
}
