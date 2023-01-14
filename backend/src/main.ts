import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configServie = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configServie.get('PORT'));
}
bootstrap();
