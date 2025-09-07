import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './order.entity';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';
import { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly dataSourceRepo: Repository<Order>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Order>): Promise<Order | null> {
    return await this.dataSourceRepo.findOne({ where, relations: ['id'] });
  }

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

  async addProductOrder(newOrders: CreateOrderDTO): Promise<CreateOrderDTO> {
    const newOrder = this.dataSourceRepo.create({
      uploadDate: newOrders.uploadDate,
    });

    return await this.dataSourceRepo.save(newOrder);
  }
}
