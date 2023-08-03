import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from 'services/ThemoviedbApi';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { filmId } = useParams();

  useEffect(() => {
    getMovieCredits(filmId)
      .then(resp => {
        setCast(resp); 
      })
      .catch(error => console.log(error));
  }, [filmId]);

  return (
    <div>
      <ul>
        {cast &&
          cast.map(({ id, profile_path, original_name, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? 'https://image.tmdb.org/t/p/w300' + profile_path
                    : 'https://via.placeholder.com/200x300'
                }
                width={200}
                height={300}
                alt={original_name}
              />
              <div>
                {original_name && <p>Actor: {original_name}</p>}
                {character && <p>Character: {character}</p>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
