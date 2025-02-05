import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (searchTerm: string, page = 1, year?: string, type?: string) => {
  const params: Record<string, string | number> = {
    apikey: API_KEY || '',
    s: searchTerm,
    page,
  };

  if (year) {
    params.y = year;
  }

  if (type) {
    params.type = type;
  }

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

export const getMovieDetails = async (imdbID: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: imdbID,
      plot: 'full',
    },
  });
  return response.data;
};
