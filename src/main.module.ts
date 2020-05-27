import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database';
import { MovieModule } from '@movie-module/movie.module';
import { AppModule } from '@app-module/app.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    MovieModule,
    AppModule
  ],
  controllers: [],
})
export class MainModule {}
