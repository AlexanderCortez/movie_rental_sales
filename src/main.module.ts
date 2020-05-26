import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database';
import { MovieModule } from '@movie-module/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    MovieModule,
  ],
  controllers: [],
})
export class MainModule {}
