import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getMovieDetails } from '../services/api';
import { MovieDetail as MovieDetailType } from '../types/movie';

const MovieDetail = () => {
  const { movieID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        if (!movieID) return;
        const data = await getMovieDetails(movieID);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        console.log(err);
        setError('An error occurred while loading movie details');
      } finally {
        setLoading(false);
      }
    };

    if (movieID) {
      fetchMovieDetails();
    }
  }, [movieID]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const getRatingValue = (rating: { Source: string; Value: string }): number => {
    if (rating.Source === 'Internet Movie Database') {
      return parseFloat(rating.Value.split('/')[0]) * 10;
    } else if (rating.Source === 'Rotten Tomatoes') {
      return parseInt(rating.Value);
    } else if (rating.Source === 'Metacritic') {
      return parseInt(rating.Value.split('/')[0]);
    }
    return 0;
  };

  const getRatingColor = (rating: { Source: string; Value: string }): string => {
    const value = getRatingValue(rating);
    if (value >= 75) return '#4CAF50';
    if (value >= 60) return '#FFC107';
    return '#f44336';
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      {movie && (
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', md: 300 }, objectFit: 'cover' }}
            image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
            alt={movie.Title}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {movie.Title} ({movie.Year})
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Runtime:</strong> {movie.Runtime}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Genre:</strong> {movie.Genre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Director:</strong> {movie.Director}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Actors:</strong> {movie.Actors}
            </Typography>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <Box
                sx={{
                  mt: 3,
                  mb: 3,
                  display: 'flex',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                {movie.Ratings.map((rating, index) => (
                  <Tooltip key={index} title={rating.Source} arrow placement="top">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '100px',
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={getRatingValue(rating)}
                        size={60}
                        sx={{
                          color: getRatingColor(rating),
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {rating.Source === 'Internet Movie Database'
                          ? 'IMDb'
                          : rating.Source === 'Rotten Tomatoes'
                            ? 'Rotten'
                            : 'Metacritic'}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {rating.Value}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Plot:</strong> {movie.Plot}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MovieDetail;
