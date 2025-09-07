import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsOrderRepository } from './products-order.repository';
import { AmountInput } from '../utils/types/input.type';
import { ProductsOrder } from './products-order.entity';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';


@Injectable()
export class ProductsOrderService {
  constructor(private readonly repository: ProductsOrderRepository) {}

  async findOne(orderId: ProductsOrder['id']): Promise<ProductsOrder> {
    console.log(orderId);
    const order = await this.repository.findOneBy({ id: orderId });
    console.log('secondddddddddddd');
    console.log(order);
    if (!order) {
      throw new NotFoundException('order not found');
    }
    console.log(order);
    return order;
  }

  async updateByAmount(
    orderId: ProductsOrder['id'],
    amount: AmountInput,
  ): Promise<ProductsOrder> {
    console.log('firsttttt');
    const order = await this.findOne(orderId);
    if (order === null) {
      throw new NotFoundException('product not found');
    }
    console.log('serciceeeeee');
    return this.repository.updateByAmount(order, amount.changeAmount);
  }

  async addNewProductOrder(newProductOrder: ProductOrderDto[]):Promise< ProductOrderDto[]> {
    return await this.repository.addNewProductOrder(newProductOrder);
  }
}
