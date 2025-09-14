import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { IProductOrder } from '@ecommerce/types';

@Entity('products_orders')
export class ProductOrder implements IProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.productsOrder, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  productId: number;

  @Column()
  amount: number;
}
