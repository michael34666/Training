import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import type { PriceInput } from '../utils/types/input.type';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    const products = await this.repository.findAllActive();

    return products;
  }

  async findOne(productId: Product['id']): Promise<Product> {
    const product = await this.repository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async isExists(productId: Product['id']): Promise<Boolean> {
    const product = await this.repository.countIfExist({ id: productId });
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    if (!product) {
      return false;
    }
    return true;
  }

  async updateByPrice(
    productId: Product['id'],
    price: PriceInput,
  ): Promise<Product> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updateByPrice(product, price.changePrice);
  }

  async updateByStatus(productId: Product['id']): Promise<Product> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updateByStatus(product);
  }

  async removeProduct(productId: Product['id']): Promise<Product> {
    const product = await this.repository.removeProduct({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
