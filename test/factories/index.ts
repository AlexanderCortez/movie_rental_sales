import * as Faker from 'faker';
import { factory, define } from 'typeorm-factories';
import { Movie } from '@entities/movie.entity';

define(Movie, (faker: typeof Faker) => {
  const movie = new Movie();
  const { random, name, lorem, date } = faker;
  movie.id = random.number();
  movie.title = name.title();
  movie.description = lorem.paragraph();
  movie.imageUrl = random.image();
  movie.stock = random.number();
  movie.rentPrice = random.number();
  movie.salePrice = random.number();
  movie.likes = random.number();
  movie.dislikes = random.number();
  movie.available = true;
  movie.active = true;
  movie.createdAt = date.past();
  movie.updatedAt = date.future();
  return movie;
});

export default factory;