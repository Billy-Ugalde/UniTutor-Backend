import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entities/career.entity.js';
import { Course } from './entities/course.entity.js';
import { Subject } from './entities/subject.entity.js';
import { CourseSubject } from './entities/course-subject.entity.js';
import { CareersService } from './services/careers.service.js';
import { CareersController } from './controllers/careers.controller.js';
import { CoursesService } from './services/courses.service.js';
import { CoursesController } from './controllers/courses.controller.js';
import { SubjectsService } from './services/subjects.service.js';
import { SubjectsController } from './controllers/subjects.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Career, Course, Subject, CourseSubject])],
  controllers: [CareersController, CoursesController, SubjectsController],
  providers: [CareersService, CoursesService, SubjectsService],
  exports: [CareersService, CoursesService, SubjectsService],
})
export class SubjectsModule {}
