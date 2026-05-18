import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

function generateJoinCode(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

@Injectable()
export class ClassroomsService {
  private readonly logger = new Logger(ClassroomsService.name);

  constructor(private prisma: PrismaService) {}

  async getClassroomsForStudent(studentProfileId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { studentId: studentProfileId, status: 'ACTIVE' },
      include: {
        classroom: {
          include: {
            teacher: { include: { user: true } },
            _count: { select: { enrollments: true, assignments: true } },
          },
        },
      },
    });
    return enrollments.map((e) => e.classroom);
  }

  async getClassroomsForTeacher(teacherProfileId: string) {
    return this.prisma.classroom.findMany({
      where: { teacherId: teacherProfileId, isActive: true },
      include: {
        _count: { select: { enrollments: true, assignments: true } },
      },
    });
  }

  async getClassroom(classroomId: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
      include: {
        teacher: { include: { user: true } },
        _count: { select: { enrollments: true, assignments: true } },
      },
    });
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  async createClassroom(
    teacherProfileId: string,
    data: { name: string; subject: string; description?: string; gradeLevel?: number },
  ) {
    let joinCode: string = '';
    let attempts = 0;
    do {
      joinCode = generateJoinCode();
      attempts++;
      const existing = await this.prisma.classroom.findUnique({ where: { joinCode } });
      if (!existing) break;
    } while (attempts < 10);

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return this.prisma.classroom.create({
      data: {
        teacherId: teacherProfileId,
        name: data.name,
        slug: `${slug}-${Date.now()}`,
        description: data.description,
        subject: data.subject,
        gradeLevel: data.gradeLevel,
        joinCode,
      },
    });
  }

  async archiveClassroom(classroomId: string, teacherProfileId: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
    });

    if (!classroom) throw new NotFoundException('Classroom not found');
    if (classroom.teacherId !== teacherProfileId) {
      throw new ForbiddenException('Only the classroom teacher can archive it');
    }

    return this.prisma.classroom.update({
      where: { id: classroomId },
      data: { isActive: false },
    });
  }

  async joinClassroom(studentProfileId: string, joinCode: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { joinCode },
      include: { _count: { select: { enrollments: true } } },
    });

    if (!classroom || !classroom.isActive) {
      throw new NotFoundException('Classroom not found with that join code');
    }

    if (classroom._count.enrollments >= classroom.maxStudents) {
      throw new BadRequestException('Classroom is full');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: { studentId_classroomId: { studentId: studentProfileId, classroomId: classroom.id } },
    });

    if (existing) {
      if (existing.status === 'ACTIVE') {
        throw new BadRequestException('Already enrolled in this classroom');
      }
      return this.prisma.enrollment.update({
        where: { id: existing.id },
        data: { status: 'ACTIVE' },
      });
    }

    return this.prisma.enrollment.create({
      data: {
        studentId: studentProfileId,
        classroomId: classroom.id,
        status: 'ACTIVE',
      },
    });
  }

  async leaveClassroom(studentProfileId: string, classroomId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { studentId_classroomId: { studentId: studentProfileId, classroomId } },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');

    return this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { status: 'INACTIVE' },
    });
  }

  async removeStudent(classroomId: string, studentProfileId: string, teacherProfileId: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
    });

    if (!classroom) throw new NotFoundException('Classroom not found');
    if (classroom.teacherId !== teacherProfileId) {
      throw new ForbiddenException('Only the classroom teacher can remove students');
    }

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { studentId_classroomId: { studentId: studentProfileId, classroomId } },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');

    return this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { status: 'REMOVED' },
    });
  }

  async getStudents(classroomId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { classroomId, status: 'ACTIVE' },
      include: {
        student: {
          include: {
            user: true,
            rank: true,
            streak: true,
          },
        },
      },
    });

    return enrollments.map((e) => ({
      enrollmentId: e.id,
      joinedAt: e.joinedAt,
      student: {
        id: e.student.id,
        userId: e.student.userId,
        name: `${e.student.user.firstName} ${e.student.user.lastName}`.trim(),
        email: e.student.user.email,
        avatarUrl: e.student.user.avatarUrl,
        totalXp: e.student.totalXp,
        level: e.student.level,
        rank: e.student.rank,
        streak: e.student.streak?.currentStreak || 0,
      },
    }));
  }

  async getClassLeaderboard(classroomId: string, limit = 50) {
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
        studentName: `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`.trim(),
        studentAvatar: enrollment.student.user.avatarUrl,
        rank: enrollment.student.rank,
        score: enrollment.student.totalXp,
        level: enrollment.student.level,
      }));
  }

  async getClassAnalytics(classroomId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { classroomId, status: 'ACTIVE' },
      include: {
        student: {
          include: {
            user: true,
            xpTransactions: { orderBy: { createdAt: 'desc' }, take: 10 },
            streak: true,
            progress: true,
          },
        },
      },
    });

    const studentCount = enrollments.length;
    const avgXp =
      studentCount > 0
        ? enrollments.reduce((sum, e) => sum + e.student.totalXp, 0) / studentCount
        : 0;

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const activeStudents = enrollments.filter((e) =>
      e.student.xpTransactions.some((t) => new Date(t.createdAt) >= lastWeek),
    ).length;

    // Calculate average mastery across all students' progress
    const allProgress = enrollments.flatMap((e) => e.student.progress);
    const avgMastery =
      allProgress.length > 0
        ? allProgress.reduce((sum, p) => sum + p.masteryLevel, 0) / allProgress.length
        : 0;

    const assignments = await this.prisma.assignment.findMany({
      where: { classroomId },
      include: {
        _count: { select: { submissions: true } },
        submissions: { where: { status: 'GRADED' } },
      },
    });

    // Average score from graded submissions
    const gradedSubmissions = assignments.flatMap((a) => a.submissions);
    const avgScore =
      gradedSubmissions.length > 0
        ? gradedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedSubmissions.length
        : 0;

    return {
      studentCount,
      avgXp: Math.round(avgXp),
      avgMastery: Math.round(avgMastery * 100) / 100,
      avgScore: Math.round(avgScore * 100) / 100,
      activeStudents,
      assignmentCount: assignments.length,
      avgCompletionRate:
        assignments.length > 0 && studentCount > 0
          ? assignments.reduce(
              (sum, a) => sum + (a._count.submissions / studentCount),
              0,
            ) / assignments.length
          : 0,
    };
  }
}
