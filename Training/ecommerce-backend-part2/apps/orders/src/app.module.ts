import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { createDatasource } from './config/dataSource';
import { ProductsOrdersModule } from './products-order/products-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createDatasource,
    }),
    OrderModule,
    ProductsOrdersModule,
  ],
})
export class AppModule {}
