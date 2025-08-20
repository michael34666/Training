import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
export type Status = 'ACTIVE' | 'DISABLED';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  uploadDate: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  sellerName: string;

  @Column()
  imageUrl: string;

  @Column()
  status: Status;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
