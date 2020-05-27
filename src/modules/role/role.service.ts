import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } })
  }

}