import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';
import { ProductsOrderService } from '../products-order/products-order.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly productOrderService: ProductsOrderService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async isExists(productId: Order['id']): Promise<Boolean> {
    const product = await this.repository.countIfExist({ id: productId });
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    if (!product) {
      return false;
    }
    return true;
  }

  async removeOrder(orderId: Order['id']): Promise<Order> {
    const order = await this.repository.removeOrder({ id: orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async addNewOrder(newOrder: CreateOrderDTO): Promise<Order> {
    const savedOrder = await this.repository.saveNewOrder(newOrder);
    const savedProducts = await this.productOrderService.addNewProduct(
      newOrder.products,
      savedOrder,
    );
    savedOrder.products = savedProducts;
    return savedOrder;
  }
}
