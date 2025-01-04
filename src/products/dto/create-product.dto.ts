import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsNumber({}, { message: 'O campo preço deve ser um número' })
  @IsPositive({ message: 'O campo preço deve ser um número positivo' })
  price: number;

  @IsNumber({}, { message: 'O campo quantidade deve ser um número' })
  @IsPositive({ message: 'O campo quantidade deve ser um número positivo' })
  amount: number;
}
