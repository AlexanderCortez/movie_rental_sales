import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '@user-module/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(entry: UserDTO): Promise<User> {
    const user = new User(entry);
    await user.setPassword();
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email, active: true });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role'],
      where: { active: true }
    });
  }
}