import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  bookId: number;
}
