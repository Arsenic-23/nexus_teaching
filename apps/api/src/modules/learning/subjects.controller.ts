import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { SubjectsService } from './subjects.service';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  async findAll() {
    const result = await this.subjectsService.findAll();
    return { data: result };
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get subject by slug with topics' })
  async findBySlug(@Param('slug') slug: string) {
    const result = await this.subjectsService.findBySlug(slug);
    return { data: result };
  }

  @Get(':slug/skill-tree')
  @ApiOperation({ summary: 'Get skill tree for a subject' })
  async getSkillTree(
    @Param('slug') slug: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.subjectsService.getSkillTree(slug, user.studentProfileId);
    return { data: result };
  }
}
