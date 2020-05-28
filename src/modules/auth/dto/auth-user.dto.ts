import { Exclude } from 'class-transformer';
import { UserDTO } from '@user-module/dto/user.dto';

export class AuthUserDTO extends UserDTO {
  @Exclude()
  password: string;

  @Exclude()
  resetPasswordToken: string;

  @Exclude()
  resetPasswordExpires: string;
}