import { Role } from 'src/shared/enum/role';
import { Auth } from './auth.decorator';

export const Admin = () => Auth(Role.USER, Role.ADMIN);
