import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';

@Controller('/rents')
export class RentController {
  constructor(
    private readonly rentService: RentService,
  ) {}

  @Get()
  findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }

  @Post('/:id/deliver')
  async deliver(
    @Param() param,
  ): Promise<Rent> {
    const rentFound = await this.rentService.findById(param.id);
    if (rentFound && !rentFound.delivered) {
      return this.rentService.deliver(param.id)
    }
    throw new NotFoundException(`Rent with id ${param.id} not found`);
  }
}