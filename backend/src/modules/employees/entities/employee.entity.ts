import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'int' })
  neutered: number;
}
