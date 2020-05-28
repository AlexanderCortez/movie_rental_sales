import {
  IsNotEmpty,
  IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cost: number;
}