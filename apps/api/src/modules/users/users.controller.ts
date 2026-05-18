import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { OnboardingDto, UpdateProfileDto, UpdateSettingsDto } from './dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.usersService.getProfile(user.userId);
    return { data: result };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateProfileDto,
  ) {
    const result = await this.usersService.updateProfile(user.userId, dto);
    return { data: result };
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Update user settings' })
  async updateSettings(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateSettingsDto,
  ) {
    const result = await this.usersService.updateSettings(user.userId, dto);
    return { data: result };
  }

  @Post('onboarding')
  @ApiOperation({ summary: 'Complete user onboarding' })
  async completeOnboarding(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: OnboardingDto,
  ) {
    const result = await this.usersService.completeOnboarding(user.userId, dto);
    return { data: result };
  }
}
