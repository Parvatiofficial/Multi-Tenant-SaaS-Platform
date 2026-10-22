import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS configuration
  const allowedOrigin = process.env.API_CORS_ORIGIN || 'http://localhost:3000';
  app.enableCors({
    origin: [allowedOrigin],
    credentials: true,
  });

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DocuMind AI Multi-Tenant API')
    .setDescription('Enterprise multi-tenant backend with custom JWT, RBAC, and AI vector ingestion')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'x-tenant-id',
        description: 'Tenant organization UUID',
      },
      'tenant-id',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 DocuMind API running on http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger documentation at http://localhost:${port}/api/docs`);
}

bootstrap();
