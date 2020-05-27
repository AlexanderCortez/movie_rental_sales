import { Module } from '@nestjs/common';
import { UserController } from '@user-module/user.controller';
import { UserService } from '@user-module/user.service';
import { RoleService } from '@role-module/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Role } from '@entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  controllers: [UserController],
})
export class UserModule {}