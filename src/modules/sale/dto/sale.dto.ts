import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Movie } from '@entities/movie.entity';
import { User } from '@entities/user.entity';

export class SaleDTO {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  movie: Movie;

  @IsNotEmpty()
  user: User;
}