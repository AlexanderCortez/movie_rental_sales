import { Module } from '@nestjs/common';
import { RoleController } from '@role-module/role.controller';
import { RoleService } from '@role-module/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
