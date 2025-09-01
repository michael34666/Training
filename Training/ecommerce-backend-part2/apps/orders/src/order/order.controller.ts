import { Controller } from '@nestjs/common';
import { Order } from '../order/order.entity';
import { OrderService } from '../order/order.service';

import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'get_by_id' })
  async findProduct(payload: { id: number }): Promise<Order> {
    return this.orderService.findOne(payload.id);
  }

  @MessagePattern({ cmd: 'get_all_order' })
  async getAllProduct(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'is_product_exsit' })
  async isExist(payload: { productId: Order['id'] }): Promise<Boolean> {
    return this.orderService.isExists(payload.productId);
  }

  @MessagePattern({ cmd: 'remove_product_by_id' })
  async remove(payload: { productId: Order['id'] }): Promise<Order> {
    return this.orderService.removeProduct(payload.productId);
  }
}
