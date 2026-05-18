import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TutorService } from './tutor.service';
import { HintsService } from './hints.service';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  constructor(
    private prisma: PrismaService,
    private tutorService: TutorService,
    private hintsService: HintsService,
  ) {}

  async getUsage(userId: string) {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const logs = await this.prisma.aIUsageLog.findMany({
      where: {
        userId,
        createdAt: { gte: last30Days },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalTokens = logs.reduce(
      (sum, l) => sum + l.inputTokens + l.outputTokens,
      0,
    );
    const totalCost = logs.reduce((sum, l) => sum + l.cost, 0);
    const totalRequests = logs.length;

    const byPurpose = logs.reduce(
      (acc, l) => {
        acc[l.purpose] = (acc[l.purpose] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      last30Days: {
        totalRequests,
        totalTokens,
        totalCost: Math.round(totalCost * 10000) / 10000,
        byPurpose,
      },
      recentLogs: logs.slice(0, 10),
    };
  }
}
