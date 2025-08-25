import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Product } from './product.entity';
import type { Status } from './product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly dataSourceRepo: Repository<Product>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Product>): Promise<Product | null> {
    const product = await this.dataSourceRepo.findOne({ where });
    if (product === null) {
      throw new Error('product not found');
    }
    return product;
  }

  async findAllActive(): Promise<Product[] | null> {
    return await this.dataSourceRepo.find({
      relations: {
        categories: true,
      },
      where: { product_status: 'ACTIVE' },
    });
  }

  async countIfExist(where: FindOptionsWhere<Product>): Promise<number> {
    return await this.dataSourceRepo.countBy(where);
  }

  async updateByPrice(
    updateProduct: Product,
    productPrice: JSON,
  ): Promise<Product | null> {
    const productUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateProduct.id },
    });

    if (productUpdate === null) {
      throw new Error('product not found');
    }
    productUpdate.price = productPrice['price'];
    return await this.dataSourceRepo.save(productUpdate);
  }
  async updateByStatus(updateProduct: Product): Promise<Product | null> {
    const productUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateProduct.id },
    });

    if (productUpdate === null) {
      throw new Error('product not found');
    }
    productUpdate.product_status = 'DISABLED';
    return await this.dataSourceRepo.save(productUpdate);
  }

  async removeProduct(
    where: FindOptionsWhere<Product>,
  ): Promise<Product | null> {
    const productToDelete = await this.dataSourceRepo.findOne({ where });

    if (!productToDelete) {
      throw new NotFoundException('Product not found');
    }

    return await this.dataSourceRepo.remove(productToDelete);
  }
}
