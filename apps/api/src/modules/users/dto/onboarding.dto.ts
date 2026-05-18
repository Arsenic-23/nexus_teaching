import { IsString, IsOptional, IsInt, IsArray, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OnboardingDto {
  @ApiProperty({ description: 'User role', enum: ['STUDENT', 'TEACHER'] })
  @IsString()
  @IsEnum(['STUDENT', 'TEACHER'])
  role!: string;

  @ApiPropertyOptional({ description: 'Grade level (for students)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  gradeLevel?: number;

  @ApiPropertyOptional({ description: 'Selected subjects' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjects?: string[];

  @ApiPropertyOptional({ description: 'Daily goal in minutes' })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  dailyGoal?: number;
}
