import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);

  constructor(private prisma: PrismaService) {}

  async getLeaderboard(type: 'global' | 'weekly' | 'monthly', limit = 50) {
    const now = new Date();

    let periodStart: Date;
    let periodEnd: Date = new Date(now.getTime() + 86400000);

    if (type === 'weekly') {
      // Start of current week (Monday)
      const dayOfWeek = now.getDay();
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      periodStart = new Date(now.setDate(diff));
      periodStart.setHours(0, 0, 0, 0);
    } else if (type === 'monthly') {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      // All-time: start from epoch
      periodStart = new Date(0);
    }

    if (type === 'global') {
      // All-time leaderboard from student profiles directly
      const students = await this.prisma.studentProfile.findMany({
        orderBy: { totalXp: 'desc' },
        take: limit,
        include: {
          user: true,
          rank: true,
        },
      });

      return students.map((s, idx) => ({
        position: idx + 1,
        studentId: s.id,
        studentName: `${s.user.firstName} ${s.user.lastName}`.trim(),
        studentAvatar: s.user.avatarUrl,
        rank: s.rank,
        score: s.totalXp,
        level: s.level,
      }));
    }

    // Weekly / Monthly: aggregate XP transactions
    const xpByStudent = await this.prisma.xPTransaction.groupBy({
      by: ['studentId'],
      where: {
        createdAt: { gte: periodStart, lt: periodEnd },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: limit,
    });

    const studentIds = xpByStudent.map((x) => x.studentId);
    const profiles = await this.prisma.studentProfile.findMany({
      where: { id: { in: studentIds } },
      include: { user: true, rank: true },
    });

    const profileMap = new Map(profiles.map((p) => [p.id, p]));

    return xpByStudent.map((entry, idx) => {
      const profile = profileMap.get(entry.studentId);
      return {
        position: idx + 1,
        studentId: entry.studentId,
        studentName: profile
          ? `${profile.user.firstName} ${profile.user.lastName}`.trim()
          : 'Unknown',
        studentAvatar: profile?.user.avatarUrl,
        rank: profile?.rank,
        score: entry._sum.amount || 0,
        level: profile?.level || 1,
      };
    });
  }

  async getClassLeaderboard(classroomId: string, limit = 50) {
    // Get enrollments for this classroom
    const enrollments = await this.prisma.enrollment.findMany({
      where: { classroomId, status: 'ACTIVE' },
      include: {
        student: {
          include: { user: true, rank: true },
        },
      },
    });

    return enrollments
      .sort((a, b) => b.student.totalXp - a.student.totalXp)
      .slice(0, limit)
      .map((enrollment, idx) => ({
        position: idx + 1,
        studentId: enrollment.studentId,
        studentName:
          `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`.trim(),
        studentAvatar: enrollment.student.user.avatarUrl,
        rank: enrollment.student.rank,
        score: enrollment.student.totalXp,
        level: enrollment.student.level,
      }));
  }
}
