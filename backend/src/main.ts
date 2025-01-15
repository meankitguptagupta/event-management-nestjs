import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Add global BearerAuth to all routes
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps token between page reloads
    },
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
