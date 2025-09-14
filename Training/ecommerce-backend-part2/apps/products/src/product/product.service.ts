import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import type { PriceInput } from '@ecommerce/types';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.repository.findAllActive();
  }

  async getById(productId: Product['id']): Promise<Product> {
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

  async updatePrice(
    productId: Product['id'],
    price: PriceInput,
  ): Promise<Product> {
    const product = await this.getById(productId);
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updatePrice(product, price.changePrice);
  }

  async updateStatus(productId: Product['id']): Promise<Product> {
    const product = await this.getById(productId);
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.updateStatus(product);
  }

  async remove(productId: Product['id']): Promise<Product> {
    const productById = await this.getById(productId);
    if (productById === null) {
      throw new NotFoundException('product not found');
    }
    const product = await this.repository.remove({ id: productId });
    return product;
  }

  async findByIds(productIds: number[]): Promise<Product[]> {
    if (productIds === null) {
      throw new NotFoundException('product not found');
    }
    return this.repository.findByIds(productIds);
  }
}
