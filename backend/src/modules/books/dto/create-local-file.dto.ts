import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalFileDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}
