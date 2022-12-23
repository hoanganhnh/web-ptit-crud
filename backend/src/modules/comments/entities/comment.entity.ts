import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../../books/entities/book.entity';
import { User } from '../../users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column()
  rate: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Book, (book) => book.comments)
  book: Book;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  createdateDates() {
    this.createdAt = new Date();
  }
}
