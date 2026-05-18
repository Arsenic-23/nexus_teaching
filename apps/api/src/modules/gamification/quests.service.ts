import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { XpService } from './xp.service';

@Injectable()
export class QuestsService {
  private readonly logger = new Logger(QuestsService.name);

  constructor(
    private prisma: PrismaService,
    private xpService: XpService,
  ) {}

  async getDailyQuests(studentProfileId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if today's quests are already assigned
    const existingProgress = await this.prisma.questProgress.findMany({
      where: {
        studentId: studentProfileId,
        assignedDate: { gte: today, lt: tomorrow },
      },
      include: { quest: true },
    });

    if (existingProgress.length > 0) {
      return existingProgress.map((qp) => ({
        ...qp,
        quest: qp.quest,
      }));
    }

    // Get student level for quest selection
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
    });

    const studentLevel = profile?.level || 1;

    // Pick 5 random quests suitable for student's level
    const availableQuests = await this.prisma.dailyQuest.findMany({
      where: {
        isActive: true,
        minLevel: { lte: studentLevel },
      },
    });

    const selectedQuests = this.pickRandomQuests(availableQuests, 5);

    if (selectedQuests.length === 0) {
      return [];
    }

    // Create progress records for each selected quest
    const progressRecords = await Promise.all(
      selectedQuests.map((quest) =>
        this.prisma.questProgress.create({
          data: {
            studentId: studentProfileId,
            questId: quest.id,
            currentValue: 0,
            isCompleted: false,
            assignedDate: today,
          },
          include: { quest: true },
        }),
      ),
    );

    return progressRecords;
  }

  async updateQuestProgress(
    studentProfileId: string,
    questType: string,
    increment: number,
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const questProgressList = await this.prisma.questProgress.findMany({
      where: {
        studentId: studentProfileId,
        assignedDate: { gte: today, lt: tomorrow },
        isCompleted: false,
        quest: { type: questType as any },
      },
      include: { quest: true },
    });

    const results = [];
    for (const qp of questProgressList) {
      const newValue = qp.currentValue + increment;
      const isCompleted = newValue >= qp.quest.targetValue;

      const updated = await this.prisma.questProgress.update({
        where: { id: qp.id },
        data: {
          currentValue: Math.min(newValue, qp.quest.targetValue),
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
        include: { quest: true },
      });

      if (isCompleted) {
        await this.xpService.awardXP(
          studentProfileId,
          qp.quest.xpReward,
          'DAILY_QUEST',
          qp.questId,
          `Quest completed: ${qp.quest.title}`,
        );
      }

      results.push(updated);
    }

    return results;
  }

  private pickRandomQuests(quests: any[], count: number) {
    const shuffled = [...quests].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}
