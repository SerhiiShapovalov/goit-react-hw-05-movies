import { NavLink, useLocation } from 'react-router-dom';

export default function MoviesList({ searchResult }) {
  const location = useLocation();
  return (
    <ul>
      {searchResult.map(({ id, title, name, poster_path }) => (
        <li key={id}>
          <NavLink key={id} to={`/movies/${id}`} state={{ from: location }}>
            <img
              src={
                poster_path
                  ? 'https://image.tmdb.org/t/p/w300' + poster_path
                  : 'https://via.placeholder.com/300x450'
              }
              width={300}
              height={450}
              alt={title || name}
            />
            <h2>{title || name}</h2>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
