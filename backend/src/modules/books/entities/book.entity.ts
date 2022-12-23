import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocalFile } from './local-file.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'public_date', type: 'timestamp' })
  publicDate: Date;

  @Column()
  page: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @OneToOne(() => LocalFile, (localFile) => localFile.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  image: LocalFile;

  @OneToMany(() => Comment, (comment) => comment.book, {
    eager: true,
  })
  comments: Comment[];
}
