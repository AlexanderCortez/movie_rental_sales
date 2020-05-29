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
  Request,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as moment from 'moment-timezone';
import { MovieService } from '@movie-module/movie.service';
import { IParam } from '@movie-module/interfaces';
import { MovieDTO } from '@movie-module/dto/movie.dto';
import { Movie } from '@entities/movie.entity';
import { MovieInterceptor } from '@movie-module/movie.interceptor';
import { Sale } from '@entities/sale.entity';
import { SaleService } from '@sale-module/sale.service';
import { SaleBodyCreateDTO } from '@sale-module/dto/sale-body-create.dto';
import { SaleDTO } from '@sale-module/dto/sale.dto';
import { AuthGuard } from '@nestjs/passport';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';
import { RentBodyCreateDTO } from '@rent-module/dto/rent-body-create.dto';
import { RentDTO } from '@rent-module/dto/rent.dto';

@ApiTags('movies')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly saleService: SaleService,
    private readonly rentService: RentService,
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/buy')
  async buyAMovie(
    @Request() req,
    @Param() param: IParam,
    @Body() body: SaleBodyCreateDTO
  ): Promise<Sale> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      if (movieFound.stock < body.quantity) {
        throw new BadRequestException('There are not enough movies in stock');
      }

      const data: SaleDTO = {
        ...body,
        cost: (body.quantity || 1) * movieFound.salePrice,
        user: req.user,
        movie: movieFound
      }

      const sale = await this.saleService.buyAMovie(data);
      const movie = await this.movieService
        .InOrDecreaseStock(movieFound.id, body.quantity, 'decrease');

      sale.movie = movie;
      return sale;
    } else {
      throw new NotFoundException(`Movie with id ${param.id} not found`);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/rent')
  async rentAMovie(
    @Request() req,
    @Param() param: IParam,
    @Body() body: RentBodyCreateDTO
  ): Promise<Rent> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      if (movieFound.stock < body.quantity) {
        throw new BadRequestException('There are not enough movies in stock');
      }

      const pendingDelivery = await this.rentService
        .checkPendingDelivery(req.user.id, movieFound.id);

      if (pendingDelivery) {
        throw new BadRequestException(`You have ${pendingDelivery.quantity} pending delivery for this movie`);
      }

      const data: RentDTO = {
        ...body,
        cost: (body.quantity || 1) * movieFound.rentPrice,
        user: req.user,
        movie: movieFound,
        shouldBeDeliveredOn: moment().add((body.timeframeInDays || 1), 'days').toDate(),
        rentedOn: moment().toDate()
      }

      const rent = await this.rentService.rentAMovie(data);
      const movie = await this.movieService
        .InOrDecreaseStock(movieFound.id, body.quantity, 'decrease');
      
      rent.movie = movie;
      return rent;

    } else {
      throw new NotFoundException(`Movie with id ${param.id} not found`);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/deliver')
  async deliver(
    @Request() req,
    @Param() param,
  ): Promise<Rent> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      const pendingDelivery = await this.rentService
        .checkPendingDelivery(req.user.id, movieFound.id);
      if (pendingDelivery) {
        const rent = await this.rentService.deliver(pendingDelivery.id);
        const movie = await this.movieService
          .InOrDecreaseStock(movieFound.id, pendingDelivery.quantity, 'increase');

        rent.movie = movie;
        return rent;
      }
      throw new NotFoundException(`Movie not found to deliver`);
    }
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }
}