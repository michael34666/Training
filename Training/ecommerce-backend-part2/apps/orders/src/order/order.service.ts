import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { ProductOrderDto } from '../utils/types/product_order_dto.type';
import { CreateOrderDTO } from '../utils/interface/create-order-dto.intrface';
import { ProductsOrderService } from '../products-order/products-order.service';

@Injectable()
export class OrderService {

  constructor(private readonly repository: OrderRepository,private readonly productOrderService:ProductsOrderService) {}

  async findAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async findOne(productId: Order['id']): Promise<Order> {
    const product = await this.repository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async isExists(productId: Order['id']): Promise<Boolean> {
    const product = await this.repository.countIfExist({ id: productId });
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    if (!product) {
      return false;
    }
    return true;
  }

  async removeOrder(orderId: Order['id']): Promise<Order> {
    const order = await this.repository.removeOrder({ id: orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async addNewOrder(newOrder: CreateOrderDTO): Promise<CreateOrderDTO> {
    const order = await this.repository.addProductOrder(newOrder);
    order.products = newOrder.products;
    console.log('one', newOrder);
    console.log('aaaa', newOrder.products);
    console.log('two', order);
    
    const productOrder = await this.productOrderService.addNewProductOrder(
      order.products,
     
    );
    console.log(order);
    return order;
  }

  async addProductOrder(newOrder: CreateOrderDTO): Promise<CreateOrderDTO> {
    return this.repository.addProductOrder(newOrder);
  }
}
