import { Controller, Get, UseGuards } from '@nestjs/common';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@role-module/role.decorator';
import { RolesGuard } from '@role-module/role.guard';

@Controller('/rents')
export class RentController {
  constructor(
    private readonly rentService: RentService
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }
}