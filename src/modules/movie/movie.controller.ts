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
  BadRequestException,
  Query,
  Patch
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as moment from 'moment-timezone';
import { MovieService } from '@movie-module/movie.service';
import { IParam } from '@movie-module/interfaces';
import { MovieDTO } from '@movie-module/dto/movie.dto';
import { Movie } from '@entities/movie.entity';
import { Sale } from '@entities/sale.entity';
import { SaleService } from '@sale-module/sale.service';
import { SaleBodyCreateDTO } from '@sale-module/dto/sale-body-create.dto';
import { SaleDTO } from '@sale-module/dto/sale.dto';
import { AuthGuard } from '@nestjs/passport';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';
import { RentBodyCreateDTO } from '@rent-module/dto/rent-body-create.dto';
import { RentDTO } from '@rent-module/dto/rent.dto';
import { Roles } from '@role-module/role.decorator';
import { RolesGuard } from '@role-module/role.guard';
import { QueryDTO } from '@movie-module/dto/query.dto';
import { MoviesResponseDTO } from '@movie-module/dto/movies-response.dto';
import { ReactionService } from '@reaction-module/reaction.service';
import { Reaction } from '@entities/reaction.entity';

@ApiTags('movies')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly saleService: SaleService,
    private readonly rentService: RentService,
    private readonly reactionService: ReactionService,
  ) { }
  
  @Get()
  @UseGuards(AuthGuard('jwt-optional'))
  findAll(
    @Request() req,
    @Query() query: QueryDTO,
  ): Promise<MoviesResponseDTO> {
    const { user } = req;
    let userIsAdmin = false;
    
    if (user.role && user.role.name === 'admin') {
      userIsAdmin = true;
    }

    const queryParams = this.movieService.buildQuery(query, userIsAdmin);
    return this.movieService.findAll(queryParams);
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

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(
    @Body() body: MovieDTO,
  ): Promise<Movie> {
    return this.movieService.create(body);
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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

  @Post('/:id/rent')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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

  @Post('/:id/deliver')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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

  @Patch('/:id/available')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async setAsAvailable(
    @Param() param: IParam
  ): Promise<Movie> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      return this.movieService.setAvailability(param.id, true);
    }
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }

  @Patch('/:id/unavailable')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async setAsUnAvailable(
    @Param() param: IParam
  ): Promise<Movie> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      return this.movieService.setAvailability(param.id, false);
    }
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }

  @Post('/:id/like')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async likeAMovie(
    @Request() req,
    @Param() param: IParam,
  ): Promise<Reaction> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      const reactionExists = await this.reactionService
        .findByUserAndMovie(req.user.id, movieFound.id);

      let reaction: Reaction = reactionExists;
      if (!reactionExists) {
        reaction = await this.reactionService.createAReaction({
          movie: movieFound,
          user: req.user,
        });
        const like = await this.reactionService.likeAMovie(reaction.id);
        const movie = await this.movieService.increaseLikes(movieFound.id, false);
        like.movie = movie;
        return like;
      }

      if (reaction.dislike && !reaction.like) {
        const like = await this.reactionService.likeAMovie(reaction.id);
        const movie = await this.movieService.increaseLikes(movieFound.id, true);
        like.movie = movie;
        return like;
      }
      return reaction;
    }
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }

  @Post('/:id/dislike')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async dislikeAMovie(
    @Request() req,
    @Param() param: IParam,
  ): Promise<Reaction> {
    const movieFound = await this.movieService.findOne(param.id);
    if (movieFound) {
      const reactionExists = await this.reactionService
        .findByUserAndMovie(req.user.id, movieFound.id);

      let reaction: Reaction = reactionExists;
      if (!reactionExists) {
        reaction = await this.reactionService.createAReaction({
          movie: movieFound,
          user: req.user,
        });
        const like = await this.reactionService.dislikeAMovie(reaction.id);
        const movie = await this.movieService.increaseDislikes(movieFound.id, false);
        like.movie = movie;
        return like;
      }

      if (reaction.like && !reaction.dislike) {
        const like = await this.reactionService.dislikeAMovie(reaction.id);
        const movie = await this.movieService.increaseDislikes(movieFound.id, true);
        like.movie = movie;
        return like;
      }
      return reaction;
    }
    throw new NotFoundException(`Movie with id ${param.id} not found`);
  }
}