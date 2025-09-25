import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

configDotenv({
  path: resolve(__dirname, '../../../.env'),
});

async function bootstrap() {
  const DEFAULT_PORT = 3000;
  const DEFAULT_HOST = 'localhost';
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ECOMMERCE APP')
    .setDescription('The ECOMMERCE API description')
    .setVersion('1.0')
    .addTag('gateway')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();

  await app
    .listen(process.env.GATEWAY_SERVICE_PORT ?? DEFAULT_PORT)
    .then(() => {
      Logger.log(
        `Gateway service is running on http://${process.env.GATEWAY_SERVICE_HOST ?? DEFAULT_HOST}:${process.env.GATEWAY_SERVICE_PORT ?? DEFAULT_PORT}`,
      );
    });
}
bootstrap();
