import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    const isDbConnected = await this.prisma.checkHealth();

    return {
      status: isDbConnected ? 'ok' : 'degraded',
      service: 'documind-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        connected: isDbConnected,
        provider: 'postgresql',
        extension: 'pgvector',
      },
    };
  }
}
