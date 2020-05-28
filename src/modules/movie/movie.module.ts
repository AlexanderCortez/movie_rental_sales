import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '@movie-module/movie.service';
import { MovieController } from '@movie-module/movie.controller';
import { Movie } from '@entities/movie.entity';
import { SaleService } from '@sale-module/sale.service';
import { Sale } from '@entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Sale])],
  providers: [MovieService, SaleService],
  controllers: [MovieController]
})
export class MovieModule {}