import {
  IsNumber,
  IsNotEmpty,
  Allow,
  ValidateIf,
  isEmpty,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RentBodyCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(0.01)
  monetaryPenaltyOnDelay: number;

  @Allow()
  @ApiProperty()
  @ValidateIf(o => !isEmpty(o.timeframeInDays))
  @Min(1)
  timeframeInDays?: number;
}