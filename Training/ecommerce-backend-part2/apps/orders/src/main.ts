import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configDotenv } from 'dotenv';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

configDotenv({
  path: resolve(__dirname, '../../../.env'),
});

async function bootstrap() {
  const DEFAULT_PORT = 3001;
  const DEFAULT_HOST = 'localhost';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.ORDER_SERVICE_HOST ?? DEFAULT_HOST,
        port: +(process.env.ORDER_SERVICE_PORT ?? DEFAULT_PORT),
      },
    },
  );

  await app.listen().then(() => {
    Logger.log(
      `Order service is running on ${process.env.ORDER_SERVICE_HOST ?? DEFAULT_HOST}:${process.env.ORDER_SERVICE_PORT ?? DEFAULT_PORT}`,
    );
  });
}
bootstrap();
