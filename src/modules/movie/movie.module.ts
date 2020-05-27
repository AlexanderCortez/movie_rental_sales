import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '@movie-module/movie.service';
import { MovieController } from '@movie-module/movie.controller';
import { Movie } from '@entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}