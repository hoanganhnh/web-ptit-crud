import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { Role } from '../../../shared/enum/role';
import { verifyPassword } from '../../../utils/bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'simple-array',
  })
  roles: Role[];

  comparePassword(passwordCanidate: string) {
    return verifyPassword(passwordCanidate, this.password);
  }
}
