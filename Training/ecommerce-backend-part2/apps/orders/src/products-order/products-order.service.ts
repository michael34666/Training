import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsOrderRepository } from './products-order.repository';
import { AmountInput } from '../utils/types/input.type';
import { ProductsOrder } from './products-order.entity';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductsOrderService {
  constructor(private readonly repository: ProductsOrderRepository) {}

  async findOne(orderId: ProductsOrder['id']): Promise<ProductsOrder> {
    const order = await this.repository.findOneBy({ id: orderId });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return order;
  }

  async findAll(orderId: number): Promise<ProductsOrder[]> {
    return this.repository.findByOrderId(orderId);
  }

  async updateByAmount(
    orderId: ProductsOrder['id'],
    amount: AmountInput,
  ): Promise<ProductsOrder> {
    const order = await this.findOne(orderId);
    if (order === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updateByAmount(order, amount.changeAmount);
  }

  async addNewProduct(
    items: ProductOrderDto[],
    order: Order,
  ): Promise<ProductsOrder[]> {
    return this.repository.addNewProduct(items, order);
  }
}
