import { ProductOrder } from '../products-order/products-order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {IOrder} from '@ecommerce/types';

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uploadDate: string;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  productsOrder: ProductOrder[];
}
