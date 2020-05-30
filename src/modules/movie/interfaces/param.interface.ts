import { ApiProperty } from '@nestjs/swagger'

export class IParam {
  @ApiProperty()
  id: number;
}