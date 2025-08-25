import { Product } from '../product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'categories',
  synchronize: false,
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @ManyToMany(() => Product)
  products: Product[];
}
