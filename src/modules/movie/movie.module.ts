import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '@movie-module/movie.service';
import { MovieController } from '@movie-module/movie.controller';
import { Movie } from '@entities/movie.entity';
import { SaleService } from '@sale-module/sale.service';
import { Sale } from '@entities/sale.entity';
import { RentService } from '@rent-module/rent.service';
import { Rent } from '@entities/rent.entity';
import { ReactionService } from '@reaction-module/reaction.service';
import { Reaction } from '@entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Sale, Rent, Reaction])],
  providers: [
    MovieService,
    SaleService,
    RentService,
    ReactionService,
  ],
  controllers: [MovieController]
})
export class MovieModule {}