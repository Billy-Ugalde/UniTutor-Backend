import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity.js';
import { CreateCourseDto } from '../dto/create-course.dto.js';
import { UpdateCourseDto } from '../dto/update-course.dto.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: { career: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: { career: true },
    });
    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }
    return course;
  }

  create(dto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create({
      ...dto,
      career: { id: dto.careerId },
    });
    return this.courseRepository.save(course);
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    const { careerId, ...rest } = dto;
    Object.assign(course, rest);
    if (careerId !== undefined) {
      course.career = { id: careerId } as Course['career'];
    }
    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }
}
