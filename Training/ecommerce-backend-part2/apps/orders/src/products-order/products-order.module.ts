import { Module } from '@nestjs/common';
import { ProductsOrderController } from './products-order.controller';
import { ProductsOrderService } from './products-order.service';
import { ProductOrder } from './products-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsOrderRepository } from './products-order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrder])],
  controllers: [ProductsOrderController],
  providers: [ProductsOrderService, ProductsOrderRepository],
  exports: [ProductsOrderService],
})
export class ProductsOrdersModule {}
