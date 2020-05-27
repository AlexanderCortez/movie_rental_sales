import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ValidateIf,
  isEmpty,
} from 'class-validator';

export class BodyValidation {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateIf(o => !isEmpty(o.imageUrl))
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  rentPrice: number;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  constructor(partial: Partial<object>) {
    Object.assign(this, partial);
  }
}
