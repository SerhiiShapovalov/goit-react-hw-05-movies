import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getTrendingMovies } from 'services/ThemoviedbApi';

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
  } else if (status === 'REJECTED') {
    return <p>Failed to fetch data</p>;
  } else if (status === 'RESOLVED') {
    return (
      <ul>
        {trendingMovie.map(obj => (
          <NavLink
            style={{ display: 'block', marginBottom: '10px' }}
            to={`movies/${obj.id}`}
            key={obj.id}
          >
            {obj.title || obj.name}
          </NavLink>
        ))}
      </ul>
    );
  }
}
