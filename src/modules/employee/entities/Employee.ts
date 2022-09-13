import {
  Column, Entity, PrimaryColumn,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column()
  cargo: string;

}

export { Employee };
