import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  book: Book;
}
