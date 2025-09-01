import { Module } from '@nestjs/common';
import { AppController } from './products_order.controller';
import { AppService } from './products_order.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
