import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {Status} from "../utils/enums/productStatus.utils"
import { Category } from '../category/category.entity';

@Entity({
  name: 'products',
  synchronize: false,
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  uploadDate: string;

  @Column()
  productDescription: string;

  @Column()
  price: number;

  @Column()
  sellerName: string;

  @Column()
  imageUrl: string;

  @Column()
  productStatus: Status;

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
