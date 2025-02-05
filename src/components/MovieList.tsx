import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchMovies, setCurrentPage } from '../store/movieSlice';
import { RootState, AppDispatch } from '../store/store';
import SearchBar from './SearchBar';
import Filters from './Filters';

const MovieList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    totalResults,
    currentPage,
    searchTerm,
    selectedYear,
    selectedType,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        fetchMovies({
          searchTerm,
          page: currentPage,
          year: selectedYear,
          type: selectedType,
        })
      );
    }
  }, [searchTerm, currentPage, selectedYear, selectedType, dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const handleRowClick = (movieID: string) => {
    navigate(`/movie/${movieID}`);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <SearchBar />
      <Filters />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Release Year</TableCell>
                  <TableCell>IMDb ID</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow
                    key={movie.imdbID}
                    onClick={() => handleRowClick(movie.imdbID)}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{movie.Title}</TableCell>
                    <TableCell>{movie.Year}</TableCell>
                    <TableCell>{movie.imdbID}</TableCell>
                    <TableCell>{movie.Type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(totalResults / 10)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MovieList;
