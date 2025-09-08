import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly dataSourceRepo: Repository<Order>,
  ) {}


  async findAll(): Promise<Order[]> {
    return this.dataSourceRepo.find();
  }

  async countIfExist(where: FindOptionsWhere<Order>): Promise<Boolean> {
    return this.dataSourceRepo.exists({ where });
  }

  async removeOrder(where: FindOptionsWhere<Order>): Promise<Order> {
    const orderToDelete = await this.dataSourceRepo.findOne({ where });

    if (!orderToDelete) {
      throw new NotFoundException('Product not found');
    }
    const deletedOrder = { ...orderToDelete };
    await this.dataSourceRepo.remove(orderToDelete);
    return deletedOrder;
  }
  async addOrder(newOrder: Order) {
    const newOne = this.dataSourceRepo.create({
      id: newOrder.id,
      uploadDate: newOrder.uploadDate,
    });
    return newOne;
  }

  async saveNewOrder(newOrders: CreateOrderDTO): Promise<Order> {
    const newOrder = this.dataSourceRepo.create({
      uploadDate: newOrders.uploadDate,
    });

    return await this.dataSourceRepo.save(newOrder);
  }

  async findOrdersProducts(): Promise<Order[]> {
    return this.dataSourceRepo.find();
  }
}
