import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); // TODO: Add the port to the .env file
}
bootstrap();



// TODO: LAST STEP - run the app and check that the app successfully runs (And then go back to the docs and complete the functions)