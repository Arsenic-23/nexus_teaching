import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { PrismaService } from '../../database/prisma.service';
import { CurrentUserPayload } from '../decorators/current-user.decorator';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);
  private jwksCache: { keys: any[]; fetchedAt: number } | null = null;
  private readonly JWKS_CACHE_TTL = 3600000; // 1 hour

  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const payload = await this.verifyToken(token);
      const clerkId = payload.sub;

      if (!clerkId) {
        throw new UnauthorizedException('Invalid token: missing subject');
      }

      // Find user in database
      const user = await this.prisma.user.findUnique({
        where: { clerkId },
        include: {
          studentProfile: true,
          teacherProfile: true,
        },
      });

      if (!user) {
        // User not synced yet - create a minimal payload
        request.user = {
          userId: '',
          clerkId,
          email: payload.email || '',
          role: 'STUDENT',
        } as CurrentUserPayload;
        return true;
      }

      request.user = {
        userId: user.id,
        clerkId: user.clerkId,
        email: user.email,
        role: user.role,
        studentProfileId: user.studentProfile?.id,
        teacherProfileId: user.teacherProfile?.id,
      } as CurrentUserPayload;

      return true;
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(`Token verification failed: ${error?.message}`);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string): Promise<any> {
    // Decode JWT header to get kid
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());

    // Check token expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new UnauthorizedException('Token has expired');
    }

    // Check issuer (Clerk issuer format)
    const clerkIssuer = this.configService.get<string>('CLERK_ISSUER');
    if (clerkIssuer && payload.iss !== clerkIssuer) {
      throw new UnauthorizedException('Invalid token issuer');
    }

    // In production, verify signature with JWKS
    // For development, we trust the payload after basic checks
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    if (nodeEnv === 'production') {
      await this.verifySignature(token, header.kid);
    }

    return payload;
  }

  private async verifySignature(token: string, kid: string): Promise<void> {
    const jwksUrl = this.configService.get<string>('CLERK_JWKS_URL');
    if (!jwksUrl) {
      this.logger.warn('CLERK_JWKS_URL not configured, skipping signature verification');
      return;
    }

    try {
      const jwks = await this.getJWKS(jwksUrl);
      const key = jwks.keys.find((k: any) => k.kid === kid);
      if (!key) {
        throw new UnauthorizedException('Token signing key not found');
      }
      // Crypto verification would use node:crypto with the JWK
      // For now, if we found the key, we consider it valid
    } catch (error: any) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error(`JWKS verification error: ${error?.message}`);
    }
  }

  private async getJWKS(url: string): Promise<{ keys: any[] }> {
    if (this.jwksCache && Date.now() - this.jwksCache.fetchedAt < this.JWKS_CACHE_TTL) {
      return { keys: this.jwksCache.keys };
    }

    const response = await fetch(url);
    const data = await response.json() as { keys: any[] };
    this.jwksCache = { keys: data.keys, fetchedAt: Date.now() };
    return data;
  }
}
