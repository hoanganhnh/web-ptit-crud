import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsInt()
  @IsNotEmpty()
  neutered: number;
}
