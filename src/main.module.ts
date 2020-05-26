import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
  ],
  controllers: [],
})
export class MainModule {}
