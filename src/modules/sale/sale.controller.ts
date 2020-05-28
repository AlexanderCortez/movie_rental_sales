import {
  Controller,
  Get,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import { Sale } from '@entities/sale.entity';

@ApiTags('sales')
@Controller('sales')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
  ) {}

  @Get()
  findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }
}