import { Product } from '../product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ICategory } from '@ecommerce/types';

@Entity('categories')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @ManyToMany(() => Product)
  products: Product[];
}
