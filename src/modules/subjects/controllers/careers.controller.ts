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
import { CareersService } from '../services/careers.service.js';
import { CreateCareerDto } from '../dto/create-career.dto.js';
import { UpdateCareerDto } from '../dto/update-career.dto.js';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  findAll() {
    return this.careersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.careersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCareerDto) {
    return this.careersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCareerDto) {
    return this.careersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.careersService.remove(id);
  }
}
