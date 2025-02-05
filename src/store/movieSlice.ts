import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies } from '../services/api';
import { Movie, MovieType } from '../types/movie';

interface MovieState {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  searchTerm: string;
  selectedYear: string;
  selectedType: MovieType | '';
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  currentPage: 1,
  searchTerm: 'Pokemon',
  selectedYear: '',
  selectedType: '',
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({
    searchTerm,
    page,
    year,
    type,
  }: {
    searchTerm: string;
    page: number;
    year?: string;
    type?: string;
  }) => {
    const response = await searchMovies(searchTerm, page, year, type);
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
      state.currentPage = 1;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Response === 'True') {
          state.movies = action.payload.Search;
          state.totalResults = parseInt(action.payload.totalResults);
        } else {
          state.movies = [];
          state.totalResults = 0;
          state.error = action.payload.Error;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export const { setSearchTerm, setSelectedYear, setSelectedType, setCurrentPage } =
  movieSlice.actions;
export default movieSlice.reducer;
