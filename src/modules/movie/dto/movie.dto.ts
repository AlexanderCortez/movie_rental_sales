import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ValidateIf,
  isEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class MovieDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @ValidateIf(o => !isEmpty(o.imageUrl))
  @IsString()
  @ApiProperty()
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  rentPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  salePrice: number;

  @Exclude()
  likes: number;

  @Exclude()
  dislikes: number;

  @Exclude()
  available: boolean;

  @Exclude()
  active: boolean;

  constructor(partial: Partial<object>) {
    Object.assign(this, partial);
  }
}
