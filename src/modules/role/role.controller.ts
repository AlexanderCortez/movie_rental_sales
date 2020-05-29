import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from '@role-module/role.service';
import { Role } from '@entities/role.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@role-module/role.decorator';
import { RolesGuard } from '@role-module/role.guard';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}