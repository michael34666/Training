import { ProductsOrders } from 'src/products_order/products_order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uploadDate: string;

  @OneToMany(() => ProductsOrders, (productsOrders) => productsOrders.id)
  productsOrders: ProductsOrders[];
}
