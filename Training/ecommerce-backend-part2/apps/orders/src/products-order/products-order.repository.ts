import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsOrder } from './products-order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ProductsOrderRepository {
  constructor(
    @InjectRepository(ProductsOrder)
    private readonly dataSourceRepo: Repository<ProductsOrder>,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<ProductsOrder>,
  ): Promise<ProductsOrder | null> {
    return await this.dataSourceRepo.findOne({ where });
  }

  async updateByAmount(
    updateOrder: ProductsOrder,
    productAmount: number,
  ): Promise<ProductsOrder> {
    const orderUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateOrder.id },
      relations: ['order'],
    });

    if (orderUpdate === null) {
      throw new NotFoundException('product not found');
    }

    orderUpdate.amount = productAmount;
    return this.dataSourceRepo.save(orderUpdate);
  }

  async addNewProduct(
    items: ProductOrderDto[],
    order: Order,
  ): Promise<ProductsOrder[]> {
    const entities = items.map((i) =>
      this.dataSourceRepo.create({
        productId: i.id,
        amount: i.amount,
        order,
      }),
    );

    return this.dataSourceRepo.save(entities);
  }

  async findAll(): Promise<ProductsOrder[]> {
    return this.dataSourceRepo.find();
  }

  async findByOrderId(orderId: number): Promise<ProductsOrder[]> {
    return this.dataSourceRepo.find({
      where: {
        order: { id: orderId },
      },
    });
  }
}
