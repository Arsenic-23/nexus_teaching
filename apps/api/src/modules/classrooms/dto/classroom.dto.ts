import { IsString, IsOptional, IsEnum, IsInt, Min, Max, IsArray, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  subject!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @Max(13)
  @IsOptional()
  gradeLevel?: number;
}

export class JoinClassroomDto {
  @ApiProperty()
  @IsString()
  joinCode!: string;
}

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ['LESSON', 'QUIZ', 'TOPIC_MASTERY', 'PRACTICE_SET'] })
  @IsEnum(['LESSON', 'QUIZ', 'TOPIC_MASTERY', 'PRACTICE_SET'])
  type!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  topicId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  quizId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  lessonIds?: string[];

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  maxAttempts?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  passingScore?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  xpBonus?: number;
}

export class GradeSubmissionDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1)
  score!: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  feedback?: string;
}
