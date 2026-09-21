import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity.js';
import { CourseSubject } from '../entities/course-subject.entity.js';
import { CreateSubjectDto } from '../dto/create-subject.dto.js';
import { UpdateSubjectDto } from '../dto/update-subject.dto.js';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(CourseSubject)
    private readonly courseSubjectRepository: Repository<CourseSubject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return subject;
  }

  create(dto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(dto);
    return this.subjectRepository.save(subject);
  }

  async update(id: number, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, dto);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }

  async assignToCourse(
    courseId: number,
    subjectId: number,
  ): Promise<CourseSubject> {
    const existing = await this.courseSubjectRepository.findOneBy({
      courseId,
      subjectId,
    });
    if (existing) {
      throw new ConflictException(
        `Subject ${subjectId} is already assigned to course ${courseId}`,
      );
    }
    const courseSubject = this.courseSubjectRepository.create({
      courseId,
      subjectId,
    });
    return this.courseSubjectRepository.save(courseSubject);
  }

  async unassignFromCourse(courseId: number, subjectId: number): Promise<void> {
    const result = await this.courseSubjectRepository.delete({
      courseId,
      subjectId,
    });
    if (!result.affected) {
      throw new NotFoundException(
        `Subject ${subjectId} is not assigned to course ${courseId}`,
      );
    }
  }
}
