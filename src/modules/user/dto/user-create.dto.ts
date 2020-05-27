import {
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '@user-module/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO
}