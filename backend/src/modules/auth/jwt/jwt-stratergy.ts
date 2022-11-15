import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from '../auth.service';

export interface JWTPayload {
  userId: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // @TODO: change hard secret or key jwt
      secretOrKey: 'jwtConstant.secret',
      ignoreExpiration: false,
      usernameField: 'email',
    });
  }

  async validate(jwtPayload: JWTPayload) {
    const { userId } = jwtPayload;
    const user = await this.authService.validateUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
