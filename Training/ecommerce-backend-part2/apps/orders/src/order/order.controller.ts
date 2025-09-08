import { Controller, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProductsOrderService } from '../products-order/products-order.service';
import type { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';

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

  @MessagePattern({ cmd: 'find_orders_with_products_and_category' })
  async findOrdersProductsCategory(): Promise<any> {
    const orders = await this.orderService.findAll();

    for (const order of orders) {
      const productsOrder = await this.productOrderService.findAll(order.id);
      const productIds = productsOrder.map((po) => po.productId);

      let products: any[] = [];
      if (productIds.length !== 0) {
        products = await firstValueFrom(
          this.productClient.send({ cmd: 'find_products_by_ids' }, productIds),
        );
      }

      order.products = productsOrder.map((prod) => ({
        ...prod,
        product: products.find((p) => p.id === prod.productId),
      }));
    }

    return orders;
  }
}
