import { Movie } from '@entities/movie.entity';

export class MoviesResponseDTO {
  count: number;
  movies: Movie[];
}