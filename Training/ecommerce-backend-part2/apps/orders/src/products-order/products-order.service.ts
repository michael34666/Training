import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsOrderRepository } from './products-order.repository';
import { AmountInput } from '@ecommerce/types';
import { ProductOrder } from './products-order.entity';
import { ProductOrderDTO } from '@ecommerce/types';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductsOrderService {
  constructor(private readonly repository: ProductsOrderRepository) {}

  async findOne(orderId: ProductOrder['id']): Promise<ProductOrder> {
    const productOrder = await this.repository.findOneBy({ id: orderId });

    if (!productOrder) {
      throw new NotFoundException('order not found');
    }

    return productOrder;
  }

  async findAll(orderId: number): Promise<ProductOrder[]> {
    return this.repository.findByOrderId(orderId);
  }

  async updateAmount(
    orderId: ProductOrder['id'],
    amount: AmountInput,
  ): Promise<ProductOrder[]> {
    const productOrder = await this.findOne(orderId);
    return this.repository.updateAmount(productOrder, amount.changeAmount);
  }

  async addProducts(
    items: ProductOrderDTO[],
    order: Order,
  ): Promise<ProductOrder[]> {
    return this.repository.addProducts(items, order);
  }
}
