import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from '../order/order.entity'


@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly dataSourceRepo: Repository<Order>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Order>): Promise<Order | null> {
    return await this.dataSourceRepo.findOne({ where });
  }

  async findAll(): Promise<Order[]> {
    return this.dataSourceRepo.find();
  }

  async countIfExist(where: FindOptionsWhere<Order>): Promise<Boolean> {
    return this.dataSourceRepo.exists({ where });
  }

  async updateByPrice(
    updateProduct: Order,
    productPrice: number,
  ): Promise<Order> {
    return new Order();
  }
  

  async removeProduct(where: FindOptionsWhere<Order>): Promise<Order> {
    const productToDelete = await this.dataSourceRepo.findOne({ where });

    if (!productToDelete) {
      throw new NotFoundException('Product not found');
    }

    return this.dataSourceRepo.remove(productToDelete);
  }
}
