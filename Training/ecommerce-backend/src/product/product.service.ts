import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}
  async findAll(): Promise<Product[] | null> {
    return await this.repository.findAllActive();
  }

  async findOne(productId: Product['id']): Promise<Product | null> {
    return await this.repository.findOneBy({ id: productId });
  }

  async isExists(productId: Product['id']): Promise<Boolean> {
    const product = this.repository.countIfExist({ id: productId });
    console.log(product);
    if ((await product) <= 0) {
      return false;
    }
    return true;
  }

  async updateByPrice(
    productId: Product['id'],
    price: JSON,
  ): Promise<Product | null> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new Error('product not found');
    }
    return await this.repository.updateByPrice(product, price);
  }

  async updateByStatus(productId: Product['id']): Promise<Product | null> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new Error('product not found');
    }
    return await this.repository.updateByStatus(product);
  }

  async removeProduct(productId: Product['id']): Promise<Product | null> {
    return await this.repository.removeProduct({ id: productId });
  }
}
