import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  Delete,
  NotFoundException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from '@movie-module/movie.service';
import { IParam } from '@movie-module/interfaces';
import { MovieDTO } from '@movie-module/dto/movie.dto';
import { Movie } from '@entities/movie.entity';
import { MovieInterceptor } from '@movie-module/movie.interceptor';
import { Sale } from '@entities/sale.entity';
import { SaleService } from '@sale-module/sale.service';
import { SaleCreateDTO } from '@sale-module/dto/sale-create.dto';

@ApiTags('movies')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly saleService: SaleService,
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
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }

  @UseInterceptors(MovieInterceptor)
  @Post()
  create(
    @Body() body: MovieDTO,
  ): Promise<Movie> {
    return this.movieService.create(body);
  }

  @UseInterceptors(MovieInterceptor)
  @Put('/:id')
  async update(
    @Param() param: IParam,
    @Body() body: MovieDTO,
  ): Promise<Movie> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      return this.movieService.update(param.id, body);
    } else {
      throw new NotFoundException(`Movie with id ${param.id} not found`);
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
      throw new NotFoundException(`Movie with id ${param.id} not found`);
    }
  }

  @Post('/:id/buy')
  buyAMovie(
    @Param() param: IParam,
    @Body() body: SaleCreateDTO
  ): Promise<Sale> {
    return this.saleService.buyAMovie();
  }
}