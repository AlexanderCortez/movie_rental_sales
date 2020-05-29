import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import { Sale } from '@entities/sale.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('sales')
@Controller('sales')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }
}