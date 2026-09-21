import { IsInt } from 'class-validator';

export class AssignSubjectDto {
  @IsInt()
  subjectId!: number;
}
