import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ name: 'dob', type: 'timestamp' })
  dob: Date;

  @Column()
  department: string;

  @Column({ type: 'int' })
  vaccinated: number;
}
