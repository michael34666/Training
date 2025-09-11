import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsOrderRepository } from './products-order.repository';
import { AmountInput } from '../utils/class/input.class';
import { ProductOrder } from './products-order.entity';
import { ProductOrderDTO } from '../utils/class/product_order_dto.class';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductsOrderService {
  constructor(private readonly repository: ProductsOrderRepository) {}

  async findOne(orderId: ProductOrder['id']): Promise<ProductOrder> {
    const order = await this.repository.findOneBy({ id: orderId });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return order;
  }

  async findAll(orderId: number): Promise<ProductOrder[]> {
    return this.repository.findByOrderId(orderId);
  }

  async updateAmount(
    orderId: ProductOrder['id'],
    amount: AmountInput,
  ): Promise<ProductOrder> {
    const order = await this.findOne(orderId);
    if (order === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updateAmount(order, amount.changeAmount);
  }

  async addNewProduct(
    items: ProductOrderDTO[],
    order: Order,
  ): Promise<ProductOrder[]> {
    return this.repository.addNew(items, order);
  }
}
