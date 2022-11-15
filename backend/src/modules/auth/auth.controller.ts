import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthSigninlDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredential: AuthCredentialDto) {
    return this.authService.signup(authCredential);
  }

  @Post('/signin')
  signin(@Body() authSigninDto: AuthSigninlDto) {
    return this.authService.signin(authSigninDto);
  }
}
