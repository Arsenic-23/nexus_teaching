import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sync')
  @ApiOperation({ summary: 'Sync user from Clerk to database' })
  async syncUser(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.authService.syncUser(user.clerkId, user.email);
    return { data: result };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  async getMe(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.authService.getCurrentUser(user.userId || user.clerkId);
    return { data: result };
  }
}
