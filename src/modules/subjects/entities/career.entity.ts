import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Course } from './course.entity.js';

@Entity('carrera')
export class Career {
  @PrimaryGeneratedColumn({ name: 'id_carrera' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  active!: boolean;

  @OneToMany(() => Course, (course) => course.career)
  courses?: Relation<Course>[];
}
