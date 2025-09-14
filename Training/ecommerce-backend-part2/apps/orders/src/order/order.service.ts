import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDTO } from '@ecommerce/types';
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

  async remove(orderId: Order['id']): Promise<Order> {
    if (!(await this.isExists(orderId))) {
      throw new NotFoundException('Order not found');
    }
    const order = await this.findOne(orderId);
    await this.repository.remove(order);

    return order;
  }

  async addNew(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const savedOrder = await this.repository.save(createOrderDTO);
    const savedProducts = await this.productOrderService.addProducts(
      createOrderDTO.products,
      savedOrder,
    );
    savedOrder.productsOrder = savedProducts;
    return savedOrder;
  }

  async findOne(orderId: Order['id']): Promise<Order> {
    const productOrder = await this.repository.findOneBy({ id: orderId });

    if (!productOrder) {
      throw new NotFoundException('order not found');
    }

    return productOrder;
  }
}
