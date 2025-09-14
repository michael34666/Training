import { Controller, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { CreateOrderDTO } from '@ecommerce/types';
import { ProductOrder } from '../products-order/products-order.entity';

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

    const productsExist = await this.isProductsExsits(productIds);
    if (!productsExist) {
      const productsNotFound = 'Not all of the products found in the order';
      this.logger.error(productsNotFound);
      throw new NotFoundException(productsNotFound);
    }

    return this.orderService.addNew(payload);
  }

  private async isProductsExsits(productsIds: number[]): Promise<Boolean> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'is_products_exist' }, { productsIds }),
    );
  }

  @MessagePattern({ cmd: 'find_orders_with_products_and_categories' })
  async findsOrdersProductsCategories(): Promise<Order[]> {
    const orders = await this.orderService.findAll();

    for (const order of orders) {
      const productIds = order.productsOrder.map((po) => po.productId);

      let products: ProductOrder[] = [];
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
