import { Movie } from '@entities/movie.entity';
import { User } from '@entities/user.entity';

export class RentDTO {
  movie: Movie;

  user: User;

  quantity: number;

  timeframeInDays?: number;

  shouldBeDeliveredOn: Date;

  cost: number;

  monetaryPenaltyOnDelay: number;

  monetaryPenaltyPaid?: number;

  rentedOn: Date;
}