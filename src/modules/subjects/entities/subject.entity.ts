import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { CourseSubject } from './course-subject.entity.js';

@Entity('materia')
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id_materia' })
  id!: number;

  @Column({ name: 'codigo', type: 'varchar', length: 30 })
  code!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  active!: boolean;

  @OneToMany(() => CourseSubject, (courseSubject) => courseSubject.subject)
  courseSubjects?: Relation<CourseSubject>[];
}
