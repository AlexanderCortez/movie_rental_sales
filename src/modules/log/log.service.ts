import { Injectable } from '@nestjs/common';
import { Log } from '@entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILog } from '@log-module/interface/log.interface';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>
  ) {}

  findAll(): Promise<Log[]> {
    return this.logRepository.find();
  }

  create(entry: ILog): Promise<Log> {
    return this.logRepository.save(entry);
  }
}