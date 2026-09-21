import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../entities/career.entity.js';
import { CreateCareerDto } from '../dto/create-career.dto.js';
import { UpdateCareerDto } from '../dto/update-career.dto.js';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  findAll(): Promise<Career[]> {
    return this.careerRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Career> {
    const career = await this.careerRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`Career ${id} not found`);
    }
    return career;
  }

  create(dto: CreateCareerDto): Promise<Career> {
    const career = this.careerRepository.create(dto);
    return this.careerRepository.save(career);
  }

  async update(id: number, dto: UpdateCareerDto): Promise<Career> {
    const career = await this.findOne(id);
    Object.assign(career, dto);
    return this.careerRepository.save(career);
  }

  async remove(id: number): Promise<void> {
    const career = await this.findOne(id);
    await this.careerRepository.remove(career);
  }
}
