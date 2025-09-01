import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../order/order.entity';
import { OrderRepository } from '../order/order.repository';


@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async findAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async findOne(productId: Order['id']): Promise<Order> {
    const product = await this.repository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
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

  

  async removeProduct(productId: Order['id']): Promise<Order> {
    const product = await this.repository.removeProduct({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
