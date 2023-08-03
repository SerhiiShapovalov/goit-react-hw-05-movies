import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from 'services/ThemoviedbApi';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { filmId } = useParams();

  useEffect(() => {
    getMovieReviews(filmId)
      .then(resp => {
        setReviews(resp);
      })
      .catch(error => console.log(error));
  }, [filmId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              {author && <h3>Author: {author}</h3>}
              {content && <p>{content}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}
