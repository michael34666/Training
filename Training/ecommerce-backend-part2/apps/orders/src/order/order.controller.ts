import { Controller, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { CreateOrderDTO } from '../utils/class/create-order-dto.class';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name, {
    timestamp: true,
  });

  constructor(
    private readonly orderService: OrderService,
    @Inject('PRODUCTS_SERVICE') private productClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_all_orders' })
  async getAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'remove_order_by_id' })
  async remove(payload: { orderId: Order['id'] }): Promise<Order> {
    return this.orderService.remove(payload.orderId);
  }

  @MessagePattern({ cmd: 'add_new_order' })
  async addNew(payload: CreateOrderDTO): Promise<Order> {
    const productIds = payload.products.map((productOrder) => productOrder.id);

    const productsExist = this.isExsit(productIds);
    if (!productsExist) {
      this.logger.error('Products not found');
      throw new NotFoundException('Product not found');
    }

    return this.orderService.addNew(payload);
  }

  private async isExsit(productsIds: number[]): Promise<Boolean> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'is_products_exist' }, { productsIds }),
    );
  }

  @MessagePattern({ cmd: 'find_orders_with_products_and_categories' })
  async findsOrdersProductsCategory(): Promise<any> {
    const orders = await this.orderService.findAll();

    for (const order of orders) {
      const productIds = order.productsOrder.map((po) => po.productId);

      let products: any[] = [];
      if (productIds.length !== 0) {
        products = await firstValueFrom(
          this.productClient.send({ cmd: 'find_products_by_ids' }, productIds),
        );
      }

      order.productsOrder = order.productsOrder.map((prod) => ({
        ...prod,
        product: products.find((p) => p.id === prod.productId),
      }));
    }

    return orders;
  }
}
