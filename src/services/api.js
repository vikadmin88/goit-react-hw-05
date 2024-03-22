import axios from 'axios';

const netClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '92569eda299b59beedeab1d251deb240',
    language: 'en-US',
  },
});

export const getMoviesByTrend = async () => {
  const { data } = await netClient.get('/trending/movie/day');
  return data.results;
};

export const getMoviesByQuery = async query => {
  const { data } = await netClient.get(`/search/movie?query=${query}`);
  return data.results;
};

export const getMovieById = async id => {
  const { data } = await netClient.get(`/movie/${id}`);
  return data;
};

export const getMovieCast = async id => {
  const { data } = await netClient.get(`movie/${id}/credits`);
  return data.cast;
};

export const getMovieReviews = async id => {
  const { data } = await netClient.get(`movie/${id}/reviews`);
  return data.results;
};
