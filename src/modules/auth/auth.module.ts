import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@auth-module/auth.service';
import { AuthController } from '@auth-module/auth.controller';
import { UserService } from '@user-module/user.service';
import { User } from '@entities/user.entity';
import { jwtConstants } from '@auth-module/constants';
import { LocalStrategy } from '@auth-module/local.strategy';
import { Role } from '@entities/role.entity';
import { RoleService } from '@role-module/role.service';
import { JwtStrategy } from '@auth-module/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    RoleService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}