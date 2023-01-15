import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  app.use(cookieParser());
  const configServie = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configServie.get('PORT'));
}
bootstrap();
