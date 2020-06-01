import { Controller, Get, UseGuards } from '@nestjs/common';
import { Log } from '@entities/log.entity';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';
import { Roles } from '@role-module/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@role-module/role.guard';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(
    private readonly logService: LogService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<Log[]> {
    return this.logService.findAll();
  }
}