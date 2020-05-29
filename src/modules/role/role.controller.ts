import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from '@role-module/role.service';
import { Role } from '@entities/role.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}