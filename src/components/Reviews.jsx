import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from 'services/ThemoviedbApi';

export default function Cast() {
  const [reviews, setReviews] = useState([]);
  const { filmId } = useParams();

  useEffect(() => {
    getMovieReviews(filmId)
      .then(resp => {
        // Проверяем, что у объекта resp есть свойство "results" и что это массив
        if (Array.isArray(resp.results)) {
          setReviews([...resp.results]);
        } else {
          // Обработка случая, когда свойство "results" отсутствует или не является массивом
          setReviews([]);
        }
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
