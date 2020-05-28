import { Controller, UseGuards, Post, Request, UseInterceptors, ClassSerializerInterceptor, Body, ConflictException } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '@auth-module/auth.service';
import { AuthBodyDTO } from '@auth-module/dto/auth-body.dto';
import { UserService } from '@user-module/user.service';
import { Role } from '@entities/role.entity';
import { RoleService } from '@role-module/role.service';
import { UserDTO } from '@user-module/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @ApiBody({ type: AuthBodyDTO })
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signIn (@Request() req): Promise<object> {
    const { accessToken } = await this.authService.signIn(req.user);
    return {
      accessToken,
      user: req.user,
    }
  }

  @Post('/signup')
  async signup(
    @Body() user: UserDTO,
  ): Promise<any> {
    let role: Role;
    const userMatch = await this.userService.findByEmail(user.email);
    if (userMatch) {
      throw new ConflictException(`User with email ${user.email} already exists`);
    }
    /**
     * If not found any users, an admin is created.
     */
    const usersCount: number = await this.userService.count();
    if (usersCount === 0) {
      role = await this.roleService.findByName('admin');
    } else {
      role = await this.roleService.findByName('user');
    }
    user.role = role;
    return this.userService.create(user);
  }
}