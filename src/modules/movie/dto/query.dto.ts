import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  ValidateIf,
  isEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDTO {
  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  order?: 'asc' | 'desc';

  @ApiProperty({ required: false })
  @ValidateIf(o => !isEmpty(o.limit))
  @Transform(value => parseInt(value))
  @Min(1)
  limit?: number;

  @ApiProperty({ required: false })
  @ValidateIf(o => !isEmpty(o.page))
  @Transform(value => parseInt(value))
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, enum: ['title', 'popularity'] })
  sortBy?: 'title' | 'popularity';

  @ApiProperty({ required: false })
  @Transform(value => value === 'true' || !value)
  available?: boolean;
}