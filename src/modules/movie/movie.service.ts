import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Movie } from '@entities/movie.entity';
import { MovieDTO } from '@movie-module/dto/movie.dto';
import { IQueryParams } from '@movie-module/interfaces/query-params.interface';
import { QueryDTO } from '@movie-module/dto/query.dto';
import { MoviesResponseDTO } from '@movie-module/dto/movies-response.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  countByAvailability(available: boolean) {
    return this.movieRepository.count({
      active: true,
      available,
    });
  }

  buildQuery(params: QueryDTO, isAdmin) {
    const {
      limit,
      page,
      sortBy,
      search,
      available,
      order
    } = params;
    const query: IQueryParams = {
      where: {
        active: true,
        available: true,
      },
      order: {}
    };

    if (isAdmin) {
      /**
       * This validation because only admins can see unavailable movies
       */
      if(available === false) {
        query.where.available = false;
      }
    }

    if (search) {
      query.where.title = Raw(title => `${title} ILIKE '%${search}%'`);
    }

    if (limit && page) {
      const skips = limit * ((page === 0 ? 1 : page) - 1);
      query.skip = skips;
      query.take = limit;
    }

    const sortOrder: 'ASC' | 'DESC' = ['asc', 'desc'].includes(order)
      ? order.toUpperCase() as 'ASC' | 'DESC' : 'DESC';

    const orderForTitle = sortOrder === 'ASC' ? 'DESC' : 'ASC';

    if (sortBy === 'title') {
      query.order.title = orderForTitle;
    } else if (sortBy === 'popularity') {
      query.order.likes = sortOrder;
    } else {
      query.order.title = orderForTitle;
    }

    return query;
  }

  async findAll(query: IQueryParams): Promise<MoviesResponseDTO> {
    let count: number;
    const movies = await this.movieRepository.find(query);
    /**
     * If title is not searched,
     * count shows the total of all active movies
     */
    if (query.where.title) {
      count = movies.length;
    } else {
      count = await this.countByAvailability(query.where.available);
    }
    return {
      count,
      movies,
    }
  }

  create(body: MovieDTO): Promise<Movie> {
    const entry = plainToClass(MovieDTO, body);
    return this.movieRepository.save(entry);
  }

  async update(id: number, body: MovieDTO): Promise<Movie> {
    const updates = plainToClass(MovieDTO, body);
    const movie = await this.findOne(id);
    return this.movieRepository.save({
      ...movie,
      ...updates,
    });
  }

  async inactivate(id: number): Promise<Movie> {
    const movie = await this.findOne(id);
    movie.active = false;
    return this.movieRepository.save(movie);
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ id, active: true })
  }

  async InOrDecreaseStock(
    id: number,
    quantity: number,
    type: 'decrease' | 'increase'
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id);
    const currentStock = movie.stock;
    if (type === 'increase') {
      movie.stock = currentStock + quantity;
    }
    if (type === 'decrease') {
      const newStock = currentStock - quantity; 
      movie.stock = newStock < 0 ? 0 : newStock;
    }
    return this.movieRepository.save(movie);
  }

  async setAvailability(id: number, available: boolean): Promise<Movie> {
    const movie = await this.findOne(id);
    movie.available = available;
    return this.movieRepository.save(movie);
  }
}