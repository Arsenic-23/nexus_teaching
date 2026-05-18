import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WebhookController } from './webhook.controller';

@Module({
  controllers: [AuthController, WebhookController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
