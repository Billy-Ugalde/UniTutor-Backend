import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
import { Career } from '../modules/subjects/entities/career.entity.js';
import { Course } from '../modules/subjects/entities/course.entity.js';
import { Subject } from '../modules/subjects/entities/subject.entity.js';
import { CourseSubject } from '../modules/subjects/entities/course-subject.entity.js';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL no está definida (cadena de conexión de Supabase)');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url,
  entities: [Career, Course, Subject, CourseSubject],
  ssl: { rejectUnauthorized: false },
  synchronize: true,
});
