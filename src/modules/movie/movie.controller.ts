import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpException,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { MovieService } from '@movie-module/movie.service';
import { IBody, IParam } from '@movie-module/interfaces';
import { Movie } from '@entities/movie.entity';
import { MovieInterceptor } from '@movie-module/movie.interceptor';
import { MessageCodeError } from '@config/errors';

@Controller('/movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService 
  ) { }
  
  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param() param: IParam,
  ): Promise<Movie> {
    const movie = await this.movieService.findOne(param.id)
    if (movie) {
      return movie;
    }
    const error = new MessageCodeError('notFound', { message: `Movie with id ${param.id} not found` })
    throw new HttpException(error, error.httpStatus);
  }

  @UseInterceptors(MovieInterceptor)
  @Post()
  create(
    @Body() body: IBody,
  ): Promise<Movie> {
    return this.movieService.create(body);
  }

  @UseInterceptors(MovieInterceptor)
  @Put('/:id')
  async update(
    @Param() param: IParam,
    @Body() body: IBody,
  ): Promise<Movie> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      return this.movieService.update(param.id, body);
    } else {
      const error = new MessageCodeError('notFound', { message: `Movie with id ${param.id} not found`})
      throw new HttpException(error, error.httpStatus);
    }
  }

  @Delete('/:id')
  async inactivate(
    @Param() param: IParam,
  ): Promise<Movie> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      return this.movieService.inactivate(param.id);
    } else {
      const error = new MessageCodeError('notFound', { message: `Movie with id ${param.id} not found` })
      throw new HttpException(error, error.httpStatus);
    }
  }
}