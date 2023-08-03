import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/ThemoviedbApi';

export default function MovieDetails() {
  const { filmId } = useParams();
  const [status, setStatus] = useState('IDLE');
  const [data, setData] = useState({});

  const location = useLocation();

  const refLocationLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    getMovieDetails(filmId)
      .then(resp => {
        setStatus('RESOLVED');
        setData({
          backdrop_path: resp.backdrop_path,
          original_title: resp.original_title,
          overview: resp.overview,
          vote_average: resp.vote_average,
          genres: resp.genres.map(({ name }) => {
            return name;
          }),
        });
      })
      .catch(error => console.log(error));
  }, [filmId]);

  if (status === 'RESOLVED') {
    const { backdrop_path, original_title, vote_average, overview, genres } =
      data;

    const userScore = Math.round(vote_average * 10);

    return (
      <section>
        <NavLink
          to={refLocationLink.current}
          style={{
            display: 'block',
            marginBottom: '10px',
          }}
        >
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: '#fff',
            }}
          >
            Go back
          </button>
        </NavLink>
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w300${backdrop_path}`
              : 'https://via.placeholder.com/300x450'
          }
          alt={original_title}
        />
        <h1>{original_title}</h1>
        <p>User Score: {userScore}%</p>
        <h2>Owerview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.join(', ')}</p>
        <div>
          <h4>Additional information</h4>
          <NavLink
            to="cast"
            style={{
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Cast
          </NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </section>
    );
  }
}
