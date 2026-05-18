import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { TutorService } from './tutor.service';
import { HintsService } from './hints.service';
import { AIService } from './ai.service';

@ApiTags('AI Tutor')
@ApiBearerAuth()
@Controller('ai')
export class AIController {
  constructor(
    private readonly tutorService: TutorService,
    private readonly hintsService: HintsService,
    private readonly aiService: AIService,
  ) {}

  @Post('tutor/sessions')
  @ApiOperation({ summary: 'Create a new AI tutor session' })
  async createSession(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { topicId?: string; lessonId?: string },
  ) {
    const result = await this.tutorService.createSession(user.studentProfileId!, body);
    return { data: result };
  }

  @Get('tutor/sessions')
  @ApiOperation({ summary: 'Get all tutor sessions for the student' })
  async getSessions(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.tutorService.getSessions(user.studentProfileId!);
    return { data: result };
  }

  @Get('tutor/sessions/:id')
  @ApiOperation({ summary: 'Get a specific tutor session with messages' })
  async getSession(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.tutorService.getSession(id, user.studentProfileId!);
    return { data: result };
  }

  @Post('tutor/sessions/:id/message')
  @ApiOperation({ summary: 'Send a message to the AI tutor' })
  async sendMessage(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { message: string },
  ) {
    const result = await this.tutorService.sendMessage(id, user.studentProfileId!, body.message);
    return { data: result };
  }

  @Post('hints')
  @ApiOperation({ summary: 'Get a progressive hint for a question' })
  async getHint(
    @Body() body: { questionId: string; currentHintLevel: number; studentAnswer?: string },
  ) {
    const result = await this.hintsService.getHint(
      body.questionId,
      body.currentHintLevel,
      body.studentAnswer,
    );
    return { data: result };
  }

  @Post('explain')
  @ApiOperation({ summary: 'Get an AI explanation for a concept' })
  async getExplanation(
    @Body() body: { conceptId: string; context?: string },
  ) {
    const result = await this.hintsService.getExplanation(body.conceptId, body.context);
    return { data: result };
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get AI usage statistics for the current user' })
  async getUsage(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.aiService.getUsage(user.userId);
    return { data: result };
  }
}
