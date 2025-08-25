import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
export type Status = 'ACTIVE' | 'DISABLED';
import { Category } from '../category/category.entity';

@Entity({
  name: 'products',
  synchronize: false,
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  uploadDate: string;

  @Column()
  product_description: string;

  @Column()
  price: number;

  @Column()
  sellerName: string;

  @Column()
  imageUrl: string;

  @Column()
  product_status: Status;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
