import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async syncUser(clerkId: string, email: string) {
    let user = await this.prisma.user.findUnique({
      where: { clerkId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!user) {
      // User doesn't exist yet - create a minimal one
      // The full user will be created via webhook or onboarding
      user = await this.prisma.user.create({
        data: {
          clerkId,
          email,
          firstName: '',
          lastName: '',
          role: 'STUDENT',
        },
        include: {
          studentProfile: true,
          teacherProfile: true,
        },
      });

      this.logger.log(`Created new user from sync: ${clerkId}`);
    }

    return user;
  }

  async getCurrentUser(userIdOrClerkId: string) {
    // Try by userId first, then by clerkId
    let user = await this.prisma.user.findUnique({
      where: { id: userIdOrClerkId },
      include: {
        studentProfile: {
          include: { rank: true },
        },
        teacherProfile: true,
      },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { clerkId: userIdOrClerkId },
        include: {
          studentProfile: {
            include: { rank: true },
          },
          teacherProfile: true,
        },
      });
    }

    return user;
  }
}
