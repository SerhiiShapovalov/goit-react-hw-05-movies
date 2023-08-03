import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies } from 'services/ThemoviedbApi';

import MoviesList from '../components/MoviesList';

export default function Movies() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const query = searchParams.get('query') ?? '';

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchParams({ query: evt.currentTarget.elements.search.value });
  };

  useEffect(() => {
    if (!query) return;
    getSearchMovies(query)
      .then(resp => {
        setSearchResult([...resp.results]);
      })
      .catch(error => console.log(error));
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movie"
          autoComplete="off"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      {searchResult.length > 0 && <MoviesList searchResult={searchResult} />}
    </div>
  );
}
