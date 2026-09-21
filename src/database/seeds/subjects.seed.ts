import { AppDataSource } from '../data-source.js';
import { Career } from '../../modules/subjects/entities/career.entity.js';
import { Course } from '../../modules/subjects/entities/course.entity.js';
import { Subject } from '../../modules/subjects/entities/subject.entity.js';
import { CourseSubject } from '../../modules/subjects/entities/course-subject.entity.js';

/** Fixed catalog: career (área) → course (categoría) → subject (materia). */
const CATALOG: Record<string, string[]> = {
  Matemáticas: ['Cálculo', 'Probabilidad y Estadística'],
  Idiomas: ['Inglés', 'Francés', 'Inglés Integrado'],
  Ciencias: ['Física', 'Química', 'Biología'],
};

function codeFrom(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);
}

async function seed(): Promise<void> {
  await AppDataSource.initialize();

  const careerRepo = AppDataSource.getRepository(Career);
  const courseRepo = AppDataSource.getRepository(Course);
  const subjectRepo = AppDataSource.getRepository(Subject);
  const courseSubjectRepo = AppDataSource.getRepository(CourseSubject);

  for (const [careerName, courseNames] of Object.entries(CATALOG)) {
    let career = await careerRepo.findOneBy({ name: careerName });
    if (!career) {
      career = await careerRepo.save(
        careerRepo.create({ name: careerName, active: true }),
      );
      console.log(`Career created: ${careerName}`);
    }

    for (const courseName of courseNames) {
      let course = await courseRepo.findOneBy({
        name: courseName,
        career: { id: career.id },
      });
      if (!course) {
        course = await courseRepo.save(
          courseRepo.create({
            name: courseName,
            code: codeFrom(courseName),
            career: { id: career.id } as Course['career'],
            active: true,
          }),
        );
        console.log(`  Course created: ${courseName}`);
      }

      let subject = await subjectRepo.findOneBy({ name: courseName });
      if (!subject) {
        subject = await subjectRepo.save(
          subjectRepo.create({
            name: courseName,
            code: codeFrom(courseName),
            active: true,
          }),
        );
        console.log(`    Subject created: ${courseName}`);
      }

      const existingLink = await courseSubjectRepo.findOneBy({
        courseId: course.id,
        subjectId: subject.id,
      });
      if (!existingLink) {
        await courseSubjectRepo.save(
          courseSubjectRepo.create({
            courseId: course.id,
            subjectId: subject.id,
          }),
        );
      }
    }
  }

  await AppDataSource.destroy();
  console.log('Subjects catalog seed completed.');
}

seed().catch((error: unknown) => {
  console.error('Error seeding subjects catalog:', error);
  process.exitCode = 1;
});
