import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('products_order')
export class ProductsOrder {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  
  order: Order;

  @Column()
  productId: number;

  @Column()
  amount: number;
}
