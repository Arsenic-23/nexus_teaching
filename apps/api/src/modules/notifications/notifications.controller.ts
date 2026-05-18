import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get notifications for the current user' })
  async getNotifications(
    @CurrentUser() user: CurrentUserPayload,
    @Query('limit') limit?: number,
  ): Promise<any> {
    const result = await this.notificationsService.getNotifications(user.userId, limit ? Number(limit) : 20);
    return { data: result };
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  async getUnreadCount(@CurrentUser() user: CurrentUserPayload): Promise<any> {
    const result = await this.notificationsService.getUnreadCount(user.userId);
    return { data: result };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  async markRead(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.notificationsService.markRead(id, user.userId);
    return { data: result };
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllRead(@CurrentUser() user: CurrentUserPayload): Promise<any> {
    const result = await this.notificationsService.markAllRead(user.userId);
    return { data: result };
  }
}
