import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDTO } from '@ecommerce/types';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly dataSourceRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.dataSourceRepo.find({ relations: ['productsOrder'] });
  }

  async countIfExist(where: FindOptionsWhere<Order>): Promise<Boolean> {
    return this.dataSourceRepo.exists({ where });
  }
  async findOneBy(where: FindOptionsWhere<Order>): Promise<Order | null> {
    return await this.dataSourceRepo.findOne({ where });
  }

  async remove(order: Order): Promise<Order> {
    await this.dataSourceRepo.remove(order);
    return order;
  }

  async save(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const order = this.dataSourceRepo.save({
      uploadDate: createOrderDTO.uploadDate,
    });

    return order;
  }

  async findOrdersProducts(): Promise<Order[]> {
    return this.dataSourceRepo.find();
  }
}
