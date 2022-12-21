import { Controller, Get, Request } from '@nestjs/common';

import { UserService } from './user.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/shared/enum/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Role.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
