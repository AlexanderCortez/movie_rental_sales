import { Controller, Get } from '@nestjs/common';
import { Log } from '@entities/log.entity';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(
    private readonly logService: LogService,
  ) {}

  @Get()
  findAll(): Promise<Log[]> {
    return this.logService.findAll();
  }
}