import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import { Sale } from '@entities/sale.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@role-module/role.decorator';
import { RolesGuard } from '@role-module/role.guard';

@ApiTags('sales')
@Controller('sales')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }
}