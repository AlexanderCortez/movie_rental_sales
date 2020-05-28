import { Module } from '@nestjs/common';
import { SaleController } from '@sale-module/sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '@entities/sale.entity';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  controllers: [SaleController],
  providers: [SaleService]
})
export class SaleModule {}