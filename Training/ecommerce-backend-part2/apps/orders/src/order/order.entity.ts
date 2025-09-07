import { ProductsOrder } from '../products-order/products-order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uploadDate: string;

  @OneToMany(() => ProductsOrder, (productsOrder) => productsOrder.order)
  products: ProductsOrder[];
}
