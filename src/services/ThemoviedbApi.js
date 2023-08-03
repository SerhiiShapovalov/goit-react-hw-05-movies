import axios from 'axios';

const API_KEY = '3b6934ed0c52e5b57602e1d4aa10a490';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
  );
  return response.data;
};

export const getSearchMovies = async query => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data; // Возвращаем весь объект response.data
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  // Проверяем, что response.data содержит свойство "results" и это является массивом
  if (Array.isArray(response.data.results)) {
    return response.data.results;
  } else {
    // Если "results" отсутствует или не является массивом, возвращаем пустой массив
    return [];
  }
};
