import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Event Management')
  .setDescription('API for event management')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
