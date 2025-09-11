import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDTO } from '../utils/class/create-order-dto.class';

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

  async remove(where: FindOptionsWhere<Order>): Promise<Order> {
    const orderToDelete = await this.dataSourceRepo.findOne({ where });

    if (!orderToDelete) {
      throw new NotFoundException('Product not found');
    }
    const deletedOrder = { ...orderToDelete };
    await this.dataSourceRepo.remove(orderToDelete);
    return deletedOrder;
  }
  async addsNew(newOrder: Order) {
    const newOne = this.dataSourceRepo.create({
      id: newOrder.id,
      uploadDate: newOrder.uploadDate,
    });
    return newOne;
  }

  async saveNew(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const order = this.dataSourceRepo.create({
      uploadDate: createOrderDTO.uploadDate,
    });

    return await this.dataSourceRepo.save(order);
  }

  async findOrdersProducts(): Promise<Order[]> {
    return this.dataSourceRepo.find();
  }
}
