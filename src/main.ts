import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL, 
  });

  app.enableCors({
    origin: true, 
  });

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
