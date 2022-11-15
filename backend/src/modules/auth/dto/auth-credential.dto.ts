import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
