import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from 'typeorm';
import { Course } from './course.entity.js';
import { Subject } from './subject.entity.js';

@Entity('curso_materia')
export class CourseSubject {
  @PrimaryColumn({ name: 'id_curso' })
  courseId!: number;

  @PrimaryColumn({ name: 'id_materia' })
  subjectId!: number;

  @ManyToOne(() => Course, (course) => course.courseSubjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_curso' })
  course!: Relation<Course>;

  @ManyToOne(() => Subject, (subject) => subject.courseSubjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_materia' })
  subject!: Relation<Subject>;
}
