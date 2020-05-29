import * as Faker from 'faker';
import { factory, define } from 'typeorm-factories';
import { Movie } from '@entities/movie.entity';
import { User } from '@entities/user.entity';
import { Role } from '@entities/role.entity';
import { Sale } from '@entities/sale.entity';
import { Rent } from '@entities/rent.entity';

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

define(User, (faker: typeof Faker) => {
  const user = new User();
  const role = new Role();
  const { random, name, internet } = faker;
  user.id = random.number();
  user.name = name.findName();
  user.email = internet.email();
  user.password = internet.password();
  
  role.id = random.number();
  role.name = 'admin';
  
  user.role = role;
  user.confirmed = true;
  user.active = true;
  return user;
});

define(Role, (faker: typeof Faker) => {
  const { lorem, random } = faker;
  const role = new Role();
  role.id = random.number();
  role.name = lorem.word();
  return role;
});

define(Sale, (faker: typeof Faker) => {
  const { random, name, internet } = faker;
  
  const user = new User();
  user.id = random.number();
  user.name = name.findName();
  user.email = internet.email();
  user.password = internet.password();
  
  const role = new Role();
  role.id = random.number();
  role.name = 'admin';
  
  const movie = new Movie();
  movie.id = random.number();
  movie.title = name.title();
  
  const sale = new Sale();
  sale.id = random.number();
  sale.quantity = random.number();
  sale.cost = random.number();
  sale.user = user;
  sale.movie = movie;
  return sale;
});

define(Rent, (faker: typeof Faker) => {
  const rent = new Rent();
  const { random, name, internet } = faker;
  
  const user = new User();
  user.id = random.number();
  user.name = name.findName();
  user.email = internet.email();
  user.password = internet.password();

  const role = new Role();
  role.id = random.number();
  role.name = 'admin';

  const movie = new Movie();
  movie.id = random.number();
  movie.title = name.title();

  rent.movie = movie;
  rent.user = user;
  rent.quantity = random.number();
  rent.id = random.number();
  return rent;
});


export default factory;