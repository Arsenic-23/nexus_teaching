import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz details (without correct answers)' })
  async getQuiz(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.quizzesService.getQuiz(id, user.studentProfileId);
    return { data: result };
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start a quiz attempt' })
  async startQuiz(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.quizzesService.startQuiz(id, user.studentProfileId!);
    return { data: result };
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit an answer for a quiz question' })
  async submitAnswer(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: { questionId: string; answer: unknown; timeSpent: number },
  ): Promise<any> {
    const result = await this.quizzesService.submitAnswer(id, user.studentProfileId!, dto);
    return { data: result };
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a quiz attempt' })
  async completeQuiz(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.quizzesService.completeQuiz(id, user.studentProfileId!);
    return { data: result };
  }
}
