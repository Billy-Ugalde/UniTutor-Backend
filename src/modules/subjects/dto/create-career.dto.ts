import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
