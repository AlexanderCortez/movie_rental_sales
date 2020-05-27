import {
  IsNotEmpty,
  Allow,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@entities/role.entity';

export class UserDTO {
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @Allow()
  role?: Role;
}