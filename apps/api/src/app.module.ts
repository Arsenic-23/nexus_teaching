import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LearningModule } from './modules/learning/learning.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { ProgressionModule } from './modules/progression/progression.module';
import { AIModule } from './modules/ai/ai.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { GamificationListener } from './common/events/gamification.listener';

@Module({
  imports: [
    // Configuration - must be first
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Event system - global
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Core infrastructure
    DatabaseModule,
    HealthModule,

    // Domain modules
    AuthModule,
    UsersModule,
    LearningModule,
    GamificationModule,
    ProgressionModule,
    AIModule,
    ClassroomsModule,
    NotificationsModule,
  ],
  providers: [
    // Global event listeners
    GamificationListener,
  ],
})
export class AppModule {}
