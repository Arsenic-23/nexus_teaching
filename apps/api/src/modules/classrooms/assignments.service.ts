import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AssignmentsService {
  private readonly logger = new Logger(AssignmentsService.name);

  constructor(private prisma: PrismaService) {}

  async getAssignments(classroomId: string, studentProfileId?: string) {
    const assignments = await this.prisma.assignment.findMany({
      where: { classroomId, isActive: true },
      orderBy: { dueDate: 'asc' },
      include: {
        _count: { select: { submissions: true } },
      },
    });

    if (!studentProfileId) return assignments;

    const submissionMap = new Map<string, any>();
    const submissions = await this.prisma.assignmentSubmission.findMany({
      where: {
        assignmentId: { in: assignments.map((a) => a.id) },
        studentId: studentProfileId,
      },
    });
    submissions.forEach((s) => submissionMap.set(s.assignmentId, s));

    return assignments.map((a) => ({
      ...a,
      mySubmission: submissionMap.get(a.id) || null,
    }));
  }

  async getAssignment(assignmentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        classroom: true,
        submissions: true,
      },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async createAssignment(
    classroomId: string,
    teacherProfileId: string,
    data: {
      title: string;
      description?: string;
      type: string;
      topicId?: string;
      quizId?: string;
      lessonIds?: string[];
      dueDate?: string;
      maxAttempts?: number;
      passingScore?: number;
      xpBonus?: number;
    },
  ) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
    });

    if (!classroom) throw new NotFoundException('Classroom not found');
    if (classroom.teacherId !== teacherProfileId) {
      throw new ForbiddenException('Only the classroom teacher can create assignments');
    }

    return this.prisma.assignment.create({
      data: {
        classroomId,
        title: data.title,
        description: data.description,
        type: data.type as any,
        topicId: data.topicId,
        quizId: data.quizId,
        lessonIds: data.lessonIds || [],
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        maxAttempts: data.maxAttempts,
        passingScore: data.passingScore,
        xpBonus: data.xpBonus || 0,
      },
    });
  }

  async submitAssignment(
    assignmentId: string,
    studentProfileId: string,
    data: unknown,
  ) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment || !assignment.isActive) {
      throw new NotFoundException('Assignment not found');
    }

    const existing = await this.prisma.assignmentSubmission.findUnique({
      where: { assignmentId_studentId: { assignmentId, studentId: studentProfileId } },
    });

    if (existing && existing.status === 'SUBMITTED') {
      return this.prisma.assignmentSubmission.update({
        where: { id: existing.id },
        data: {
          attempts: { increment: 1 },
          status: 'SUBMITTED',
          submittedAt: new Date(),
        },
      });
    }

    return this.prisma.assignmentSubmission.upsert({
      where: { assignmentId_studentId: { assignmentId, studentId: studentProfileId } },
      create: {
        assignmentId,
        studentId: studentProfileId,
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      update: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
        attempts: { increment: 1 },
      },
    });
  }
}
