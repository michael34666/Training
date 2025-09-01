import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

configDotenv({
  path: resolve(__dirname, '../../../.env'),
});

async function bootstrap() {
  const DEFAULT_PORT = 3000;

  const app = await NestFactory.create(AppModule);

  await app
    .listen(process.env.GATEWAY_SERVICE_PORT ?? DEFAULT_PORT)
    .then(() => {
      Logger.log(
        `Gateway service is running on http://localhost:${process.env.GATEWAY_SERVICE_PORT ?? DEFAULT_PORT}`,
      );
    });
}
bootstrap();
