import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Career } from './career.entity.js';
import { CourseSubject } from './course-subject.entity.js';

@Entity('curso')
export class Course {
  @PrimaryGeneratedColumn({ name: 'id_curso' })
  id!: number;

  @ManyToOne(() => Career, (career) => career.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_carrera' })
  career!: Relation<Career>;

  @Column({ name: 'codigo', type: 'varchar', length: 30 })
  code!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  active!: boolean;

  @OneToMany(() => CourseSubject, (courseSubject) => courseSubject.course)
  courseSubjects?: Relation<CourseSubject>[];
}
