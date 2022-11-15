import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthSigninlDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
