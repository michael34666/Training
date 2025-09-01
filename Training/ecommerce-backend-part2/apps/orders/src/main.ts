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

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: +(process.env.ORDER_SERVICE_PORT ?? DEFAULT_PORT),
      },
    },
  );

  await app.listen().then(() => {
    Logger.log(
      `Order service is running on localhost:${process.env.ORDER_SERVICE_PORT ?? DEFAULT_PORT}`,
    );
  });
}
bootstrap();
