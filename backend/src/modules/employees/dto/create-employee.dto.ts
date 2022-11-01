import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Date)
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsInt()
  @IsNotEmpty()
  vaccinated: number;
}
