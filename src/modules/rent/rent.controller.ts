import { Controller, Get } from '@nestjs/common';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';

@Controller('/rents')
export class RentController {
  constructor(
    private readonly rentService: RentService
  ) {}

  @Get()
  findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }
}