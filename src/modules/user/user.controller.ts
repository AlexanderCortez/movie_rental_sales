import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@user-module/user.service';
import { UserCreateDTO } from '@user-module/dto/user-create.dto';
import { User } from '@entities/user.entity';
import { RoleService } from '@role-module/role.service';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) { }

  @Post()
  async create(
    @Body() body: UserCreateDTO,
  ): Promise<User> {
    const { user, roleName } = body;
    const role = await this.roleService.findByName(roleName);
    if (role) {
      const userMatch = await this.userService.findByEmail(user.email);
      if (userMatch) {
        throw new ConflictException(`User with email ${user.email} already exists`);
      }
      user.role = role;
      return this.userService.create(user);
    }
    throw new NotFoundException(`Role name (${roleName}) provided not found`);
  }
  
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}