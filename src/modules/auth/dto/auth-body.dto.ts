import { ApiProperty } from '@nestjs/swagger';

export class AuthBodyDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}