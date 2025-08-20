import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  findAll() {
    return;
  }

  findOne(id: number) {
    const products = 0;
    if (!products) {
      throw new NotFoundException('product not found');
    }
    return products;
  }

  create(newProduct: Product) {}
}
