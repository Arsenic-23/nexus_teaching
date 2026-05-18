import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RanksService {
  constructor(private prisma: PrismaService) {}

  async getAllRanks() {
    return this.prisma.rank.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getCurrentRank(studentProfileId: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
      include: { rank: true },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    // Find the correct rank based on XP
    const rank = await this.prisma.rank.findFirst({
      where: {
        minXp: { lte: profile.totalXp },
        maxXp: { gt: profile.totalXp },
      },
      orderBy: { order: 'desc' },
    });

    const nextRank = rank
      ? await this.prisma.rank.findFirst({
          where: { order: rank.order + 1 },
        })
      : null;

    return {
      currentRank: rank || profile.rank,
      nextRank,
      xpToNextRank: nextRank ? nextRank.minXp - profile.totalXp : 0,
      totalXp: profile.totalXp,
    };
  }

  async updateRank(studentProfileId: string, totalXp: number) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
    });

    if (!profile) return null;

    const newRank = await this.prisma.rank.findFirst({
      where: {
        minXp: { lte: totalXp },
        maxXp: { gt: totalXp },
      },
      orderBy: { order: 'desc' },
    });

    if (newRank && newRank.id !== profile.rankId) {
      await this.prisma.studentProfile.update({
        where: { id: studentProfileId },
        data: { rankId: newRank.id },
      });
      return { rankChanged: true, newRank, previousRankId: profile.rankId };
    }

    return { rankChanged: false };
  }
}
