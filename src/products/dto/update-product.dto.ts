import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString({ message: 'O campo nome deve ser uma string' })
  name: string;

  @IsNumber({}, { message: 'O campo preço deve ser um número' })
  @IsPositive({ message: 'O campo preço deve ser um número positivo' })
  price: number;

  @IsNumber({}, { message: 'O campo quantidade deve ser um número' })
  @IsPositive({ message: 'O campo quantidade deve ser um número positivo' })
  amount: number;
}
