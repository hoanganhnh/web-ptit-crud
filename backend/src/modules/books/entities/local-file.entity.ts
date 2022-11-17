import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class LocalFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}
