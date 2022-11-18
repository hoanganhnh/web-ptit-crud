import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocalFile } from './local-file.entity';

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
  category: string;

  @OneToOne(() => LocalFile, (localFile) => localFile.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  image: LocalFile;
}
