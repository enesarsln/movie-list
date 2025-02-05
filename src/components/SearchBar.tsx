import * as React from 'react';
import { TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/movieSlice';
import { RootState } from '../store/store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.movies.searchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search Movie"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchBar;
