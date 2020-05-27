import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Movie } from '@entities/movie.entity';
import { IBody } from '@movie-module/interfaces';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ active: true });
  }

  create(body: IBody): Promise<Movie> {
    const entry = plainToClass(IBody, body);
    return this.movieRepository.save(entry);
  }

  async update(id: number, body: IBody): Promise<Movie> {
    const updates = plainToClass(IBody, body);
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