import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

const validateIfCallback = (object: object, value: unknown) =>
  value !== undefined && value !== null;

export class ProductUpdateDto {
  @ValidateIf(validateIfCallback)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ValidateIf(validateIfCallback)
  @IsNumber({ allowNaN: false })
  @IsNotEmpty()
  price?: number;

  @ValidateIf(validateIfCallback)
  @IsString()
  description?: string;

  @ValidateIf(validateIfCallback)
  @IsString()
  imgURL?: string;

  @ValidateIf(validateIfCallback)
  @IsDate()
  expiredAt?: Date;
}
