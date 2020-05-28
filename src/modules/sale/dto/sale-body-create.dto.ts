import {
  IsNotEmpty,
  IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleBodyCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;
}