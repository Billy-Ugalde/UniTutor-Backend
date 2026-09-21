import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from '../services/courses.service.js';
import { SubjectsService } from '../services/subjects.service.js';
import { CreateCourseDto } from '../dto/create-course.dto.js';
import { UpdateCourseDto } from '../dto/update-course.dto.js';
import { AssignSubjectDto } from '../dto/assign-subject.dto.js';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  @Post(':id/subjects')
  assignSubject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignSubjectDto,
  ) {
    return this.subjectsService.assignToCourse(id, dto.subjectId);
  }

  @Delete(':id/subjects/:subjectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  unassignSubject(
    @Param('id', ParseIntPipe) id: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.subjectsService.unassignFromCourse(id, subjectId);
  }
}
