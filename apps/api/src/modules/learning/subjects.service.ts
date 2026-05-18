import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const subjects = await this.prisma.subject.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { topics: true },
        },
      },
    });

    return subjects;
  }

  async findBySlug(slug: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { slug },
      include: {
        topics: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            _count: {
              select: { lessons: true, quizzes: true },
            },
          },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException(`Subject "${slug}" not found`);
    }

    return subject;
  }

  async getSkillTree(subjectSlug: string, studentProfileId?: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { slug: subjectSlug },
      include: {
        topics: {
          where: { isActive: true },
          include: {
            prerequisites: {
              include: { prerequisite: true },
            },
            dependents: {
              include: { topic: true },
            },
          },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException(`Subject "${subjectSlug}" not found`);
    }

    // Get student progress if authenticated
    let progressMap = new Map<string, any>();
    if (studentProfileId) {
      const progress = await this.prisma.studentProgress.findMany({
        where: {
          studentId: studentProfileId,
          topicId: { in: subject.topics.map((t) => t.id) },
        },
      });
      progressMap = new Map(progress.map((p) => [p.topicId, p]));
    }

    const nodes = subject.topics.map((topic) => {
      const studentProgress = progressMap.get(topic.id);
      return {
        topicId: topic.id,
        name: topic.name,
        position: { x: topic.treeX || 0, y: topic.treeY || 0 },
        masteryStatus: studentProgress?.masteryStatus || 'NOT_STARTED',
        masteryLevel: studentProgress?.masteryLevel || 0,
        isUnlocked: studentProgress?.isUnlocked ?? (topic.prerequisites.length === 0),
        prerequisites: topic.prerequisites.map((p) => p.prerequisiteId),
        dependents: topic.dependents.map((d) => d.topicId),
      };
    });

    const edges = subject.topics.flatMap((topic) =>
      topic.prerequisites.map((prereq) => ({
        from: prereq.prerequisiteId,
        to: topic.id,
        requiredMastery: prereq.requiredMastery,
      })),
    );

    return {
      subjectId: subject.id,
      nodes,
      edges,
    };
  }
}
