import { Controller, Get, UseGuards } from '@nestjs/common';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/rents')
export class RentController {
  constructor(
    private readonly rentService: RentService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }
}