import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
