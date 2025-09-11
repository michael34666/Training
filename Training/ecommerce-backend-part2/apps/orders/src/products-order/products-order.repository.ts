import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrder } from './products-order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductOrderDTO } from '../utils/class/product_order_dto.class';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductsOrderRepository {
  constructor(
    @InjectRepository(ProductOrder)
    private readonly dataSourceRepo: Repository<ProductOrder>,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<ProductOrder>,
  ): Promise<ProductOrder | null> {
    return await this.dataSourceRepo.findOne({ where });
  }

  async updateAmount(
    updateOrder: ProductOrder,
    productAmount: number,
  ): Promise<ProductOrder> {
    const orderUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateOrder.id },
    });

    if (orderUpdate === null) {
      throw new NotFoundException('product not found');
    }

    orderUpdate.amount = productAmount;
    return this.dataSourceRepo.save(orderUpdate);
  }

  async addNew(
    items: ProductOrderDTO[],
    order: Order,
  ): Promise<ProductOrder[]> {
    const entities = items.map((i) =>
      this.dataSourceRepo.create({
        productId: i.id,
        amount: i.amount,
        order,
      }),
    );

    return this.dataSourceRepo.save(entities);
  }

  async findAll(): Promise<ProductOrder[]> {
    return this.dataSourceRepo.find();
  }

  async findByOrderId(orderId: number): Promise<ProductOrder[]> {
    return this.dataSourceRepo.find({
      where: {
        order: { id: orderId },
      },
    });
  }
}
