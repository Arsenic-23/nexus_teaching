import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OnboardingDto, UpdateProfileDto, UpdateSettingsDto } from './dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: { rank: true, streak: true },
        },
        teacherProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userUpdate: Record<string, any> = {};
    if (dto.firstName) userUpdate.firstName = dto.firstName;
    if (dto.lastName) userUpdate.lastName = dto.lastName;
    if (dto.avatarUrl) userUpdate.avatarUrl = dto.avatarUrl;

    if (Object.keys(userUpdate).length > 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: userUpdate,
      });
    }

    if (user.studentProfile && (dto.gradeLevel !== undefined || dto.subjects !== undefined || dto.dailyGoal !== undefined || dto.timezone !== undefined)) {
      const profileUpdate: Record<string, any> = {};
      if (dto.gradeLevel !== undefined) profileUpdate.gradeLevel = dto.gradeLevel;
      if (dto.subjects !== undefined) profileUpdate.subjects = dto.subjects;
      if (dto.dailyGoal !== undefined) profileUpdate.dailyGoal = dto.dailyGoal;
      if (dto.timezone !== undefined) profileUpdate.timezone = dto.timezone;

      await this.prisma.studentProfile.update({
        where: { id: user.studentProfile.id },
        data: profileUpdate,
      });
    }

    return this.getProfile(userId);
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.studentProfile) {
      const profileUpdate: Record<string, any> = {};
      if (dto.timezone !== undefined) profileUpdate.timezone = dto.timezone;
      if (dto.dailyGoal !== undefined) profileUpdate.dailyGoal = dto.dailyGoal;

      if (Object.keys(profileUpdate).length > 0) {
        await this.prisma.studentProfile.update({
          where: { id: user.studentProfile.id },
          data: profileUpdate,
        });
      }
    }

    return this.getProfile(userId);
  }

  async completeOnboarding(userId: string, dto: OnboardingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true, teacherProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { role: dto.role as any },
    });

    if (dto.role === 'STUDENT') {
      if (user.studentProfile) {
        await this.prisma.studentProfile.update({
          where: { id: user.studentProfile.id },
          data: {
            gradeLevel: dto.gradeLevel,
            subjects: dto.subjects || [],
            dailyGoal: dto.dailyGoal || 30,
            onboardingComplete: true,
          },
        });
      } else {
        await this.prisma.studentProfile.create({
          data: {
            userId: user.id,
            gradeLevel: dto.gradeLevel,
            subjects: dto.subjects || [],
            dailyGoal: dto.dailyGoal || 30,
            onboardingComplete: true,
          },
        });
      }

      // Initialize streak
      const profile = await this.prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });
      if (profile) {
        await this.prisma.streak.upsert({
          where: { studentId: profile.id },
          create: {
            studentId: profile.id,
            currentStreak: 0,
            longestStreak: 0,
          },
          update: {},
        });
      }
    } else if (dto.role === 'TEACHER') {
      if (!user.teacherProfile) {
        await this.prisma.teacherProfile.create({
          data: {
            userId: user.id,
            subjects: dto.subjects || [],
          },
        });
      } else {
        await this.prisma.teacherProfile.update({
          where: { id: user.teacherProfile.id },
          data: {
            subjects: dto.subjects || [],
          },
        });
      }
    }

    return this.getProfile(userId);
  }
}
