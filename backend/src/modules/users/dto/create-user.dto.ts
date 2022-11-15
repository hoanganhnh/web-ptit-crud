import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';

import { Role } from '../../../shared/enum/role';
import { AuthCredentialDto } from '../../../modules/auth/dto/auth-credential.dto';

export class CreateUserDto extends PartialType(AuthCredentialDto) {
  @IsEnum(Role, {
    each: true,
    message: 'Role must USER, ADMIN',
  })
  @IsString({ each: true })
  roles: Role[];
}
