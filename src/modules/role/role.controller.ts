import { Controller, Get } from '@nestjs/common';
import { RoleService } from '@role-module/role.service';
import { Role } from '@entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}