import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ allowNaN: false })
  @IsNotEmpty()
  price: number;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  description?: string;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  imgURL?: string;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsDate()
  expiredAt?: Date;
}
