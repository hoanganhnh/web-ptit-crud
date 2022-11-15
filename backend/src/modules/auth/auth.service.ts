import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JWTPayload } from './jwt/jwt-stratergy';
import { genSalt } from '../../utils/bcrypt';
import { Role } from '../../shared/enum/role';
import { AuthSigninlDto } from './dto/auth-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authCredentialDto: AuthCredentialDto) {
    authCredentialDto.password = await this.hashPassword(
      authCredentialDto.password,
    );

    const userExisted = await this.userService.findOneUser({
      where: { email: authCredentialDto.email },
    });

    if (userExisted) {
      throw new BadRequestException('Email is existed !');
    }

    const roles = [Role.USER];
    const user = await this.userService.create({
      ...authCredentialDto,
      roles,
    });

    const accessToken = this.createToken({
      email: user.email,
      userId: user.id,
    });

    return { accessToken };
  }

  async signin(authSigninDto: AuthSigninlDto) {
    const { email, password } = authSigninDto;

    const user = await this.userService.findOneUser({ where: { email } });

    if (!user) {
      throw new BadRequestException('Email is not existed !');
    }

    const isCrrectPassword = user.comparePassword(password);

    if (!isCrrectPassword) {
      throw new UnauthorizedException('Passord is incorrect !');
    }

    const accessToken = this.createToken({ email, userId: user.id });
    return { user, accessToken };
  }

  private async hashPassword(password: string) {
    const salt = await genSalt();
    return bcrypt.hash(password, salt);
  }

  private createToken(payload: JWTPayload) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async validateUser(id: string) {
    const user = await this.userService.findOneUserById(id);
    return user;
  }
}
