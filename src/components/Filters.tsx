import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedYear, setSelectedType } from '../store/movieSlice';
import { RootState } from '../store/store';

const Filters = () => {
  const dispatch = useDispatch();
  const { selectedYear, selectedType } = useSelector((state: RootState) => state.movies);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          label="Year"
          onChange={(e) => dispatch(setSelectedYear(e.target.value))}
        >
          <MenuItem value="">All</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year.toString()}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={selectedType}
          label="Type"
          onChange={(e) => dispatch(setSelectedType(e.target.value))}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
