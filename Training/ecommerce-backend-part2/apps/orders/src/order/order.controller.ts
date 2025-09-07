import { Controller, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';
import { firstValueFrom } from 'rxjs';
import { ProductsOrderService } from '../products-order/products-order.service';
import type { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';
import { Console } from 'console';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name, {
    timestamp: true,
  });

  constructor(
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductsOrderService,
    @Inject('PRODUCTS_SERVICE') private productClient: ClientProxy,
  ) {}
  //
  @MessagePattern({ cmd: 'get_all_order' })
  async getAllOrder(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'remove_order_by_id' })
  async remove(payload: { orderId: Order['id'] }): Promise<Order> {
    return this.orderService.removeOrder(payload.orderId);
  }

  @MessagePattern({ cmd: 'add_new_order' })
  async addNewOrder(payload: CreateOrderDTO): Promise<CreateOrderDTO> {
    const productIds = payload.products.map((productOrder) => productOrder.id);

    if (!(await this.isExsit(productIds))) {
      this.logger.error('Products not found');

      throw new NotFoundException('Product not found');
    }

    return this.orderService.addNewOrder(payload);
  }

  async isExsit(productsIds: number[]): Promise<Boolean> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'is_products_exist' }, { productsIds }),
    );
  }

 
}
