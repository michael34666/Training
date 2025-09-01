import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
@Entity('productsOrders')
export class ProductsOrders {
  @PrimaryGeneratedColumn()
  id: number;

  product_id: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @Column()
  amount: number;
}
