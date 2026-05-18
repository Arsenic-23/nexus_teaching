import { IsString, IsOptional, IsBoolean, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  @IsOptional()
  dailyGoal?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  streakReminder?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  weeklyReport?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  achievementAlerts?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  classAnnouncements?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  newLessons?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  emailDigest?: boolean;
}
