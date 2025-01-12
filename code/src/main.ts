import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
      whitelist: true, // Remove properties not in the DTO
      forbidNonWhitelisted: true, // Throw error for extra properties
      transform: true, // Transform input to DTO instances
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
