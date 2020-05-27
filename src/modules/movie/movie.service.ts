import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Movie } from '@entities/movie.entity';
import { MovieDTO } from '@movie-module/dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ active: true });
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
}