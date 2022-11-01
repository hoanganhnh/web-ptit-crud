import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  publicDate: Date;

  @IsInt()
  page: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}
