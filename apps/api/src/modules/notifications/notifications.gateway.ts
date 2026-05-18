import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  EVENTS,
  XPEarnedEvent,
  AchievementUnlockedEvent,
  RankUpEvent,
  StreakUpdatedEvent,
  QuestCompletedEvent,
} from '../../common/events/events';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: 'realtime',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  // Map userId -> socketId
  private userSockets = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
    // Clean up user socket mapping
    this.userSockets.forEach((sockets, userId) => {
      sockets.delete(client.id);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
      }
    });
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    if (data.userId) {
      const sockets = this.userSockets.get(data.userId) || new Set<string>();
      sockets.add(client.id);
      this.userSockets.set(data.userId, sockets);
      client.join(`user:${data.userId}`);
      this.logger.debug(`User ${data.userId} authenticated on socket ${client.id}`);
    }
  }

  @OnEvent(EVENTS.XP_EARNED)
  handleXPEarned(event: XPEarnedEvent) {
    this.emitToStudent(event.studentProfileId, 'xp:earned', {
      amount: event.amount,
      source: event.source,
      total: event.totalXp,
      level: event.level,
    });
  }

  @OnEvent(EVENTS.ACHIEVEMENT_UNLOCKED)
  handleAchievementUnlocked(event: AchievementUnlockedEvent) {
    this.emitToUser(event.userId, 'achievement:unlocked', {
      achievementId: event.achievementId,
      xpReward: event.xpReward,
    });
  }

  @OnEvent(EVENTS.RANK_UP)
  handleRankUp(event: RankUpEvent) {
    this.emitToUser(event.userId, 'rank:up', {
      newRankId: event.newRankId,
      previousRankId: event.previousRankId,
    });
  }

  @OnEvent(EVENTS.STREAK_UPDATED)
  handleStreakUpdated(event: StreakUpdatedEvent) {
    this.emitToUser(event.userId, 'streak:updated', {
      currentStreak: event.currentStreak,
      longestStreak: event.longestStreak,
      maintained: event.maintained,
    });
  }

  @OnEvent(EVENTS.QUEST_COMPLETED)
  handleQuestCompleted(event: QuestCompletedEvent) {
    this.emitToStudent(event.studentProfileId, 'quest:completed', {
      questId: event.questId,
      xpReward: event.xpReward,
    });
  }

  private emitToUser(userId: string, event: string, data: unknown) {
    this.server.to(`user:${userId}`).emit(event, {
      event,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  private emitToStudent(studentProfileId: string, event: string, data: unknown) {
    // We need to look up the userId for the studentProfileId
    // This is a simplification - in production, we'd cache this mapping
    this.server.emit(`student:${studentProfileId}:${event}`, {
      event,
      data,
      timestamp: new Date().toISOString(),
    });
  }
}
