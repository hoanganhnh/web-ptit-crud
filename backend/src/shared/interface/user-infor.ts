import { Request } from 'express';

import { User as UserEnity } from '../../modules/users/entities/user.entity';

export interface UserInfoRequest extends Request {
  user: UserEnity;
}
