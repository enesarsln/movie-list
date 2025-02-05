export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetail extends Movie {
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Ratings: Rating[];
}

export type MovieType = 'movie' | 'series' | 'episode';
