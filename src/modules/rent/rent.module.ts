import { Module } from '@nestjs/common';
import { RentController } from '@rent-module/rent.controller';
import { RentService } from '@rent-module/rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from '@entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentController],
  providers: [RentService]
})
export class RentModule {}