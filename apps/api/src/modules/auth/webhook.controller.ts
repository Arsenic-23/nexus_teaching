import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { PrismaService } from '../../database/prisma.service';
import { ConfigService } from '@nestjs/config';

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    primary_email_address_id?: string;
  };
}

@ApiTags('Auth Webhooks')
@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  @Public()
  @Post('clerk')
  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Handle Clerk webhook events' })
  async handleClerkWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() body: ClerkWebhookEvent,
  ) {
    // Verify webhook signature in production
    const webhookSecret = this.config.get<string>('CLERK_WEBHOOK_SECRET');
    if (webhookSecret && !svixId) {
      throw new BadRequestException('Missing webhook verification headers');
    }

    this.logger.log(`Received Clerk webhook: ${body.type}`);

    switch (body.type) {
      case 'user.created':
        await this.handleUserCreated(body.data);
        break;
      case 'user.updated':
        await this.handleUserUpdated(body.data);
        break;
      case 'user.deleted':
        await this.handleUserDeleted(body.data);
        break;
      default:
        this.logger.warn(`Unhandled webhook event: ${body.type}`);
    }

    return { received: true };
  }

  private async handleUserCreated(data: ClerkWebhookEvent['data']) {
    const email = this.getPrimaryEmail(data);
    if (!email) {
      this.logger.warn(`No email found for Clerk user ${data.id}`);
      return;
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { clerkId: data.id },
    });

    if (existingUser) {
      this.logger.log(`User already exists for Clerk ID ${data.id}`);
      return;
    }

    await this.prisma.user.create({
      data: {
        clerkId: data.id,
        email,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        avatarUrl: data.image_url,
        role: 'STUDENT',
      },
    });

    this.logger.log(`Created user from webhook: ${data.id}`);
  }

  private async handleUserUpdated(data: ClerkWebhookEvent['data']) {
    const email = this.getPrimaryEmail(data);

    const updateData: Record<string, any> = {};
    if (email) updateData.email = email;
    if (data.first_name !== undefined) updateData.firstName = data.first_name;
    if (data.last_name !== undefined) updateData.lastName = data.last_name;
    if (data.image_url !== undefined) updateData.avatarUrl = data.image_url;

    if (Object.keys(updateData).length > 0) {
      await this.prisma.user.update({
        where: { clerkId: data.id },
        data: updateData,
      });
      this.logger.log(`Updated user from webhook: ${data.id}`);
    }
  }

  private async handleUserDeleted(data: ClerkWebhookEvent['data']) {
    await this.prisma.user.update({
      where: { clerkId: data.id },
      data: { isActive: false },
    });
    this.logger.log(`Deactivated user from webhook: ${data.id}`);
  }

  private getPrimaryEmail(data: ClerkWebhookEvent['data']): string | null {
    if (!data.email_addresses || data.email_addresses.length === 0) return null;
    const primary = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id,
    );
    return primary?.email_address || data.email_addresses[0].email_address;
  }
}
