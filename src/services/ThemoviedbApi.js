import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  return response.data;
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to fetch movie details. Please go to the Home Page.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
    throw new Error('Failed to fetch movie details.');
  }
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
  if (Array.isArray(response.data.results)) {
    return response.data.results;
  } else {
    return [];
  }
};
