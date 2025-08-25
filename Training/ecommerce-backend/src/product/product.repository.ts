import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Product } from './product.entity';
import { Status } from '../utils/enums/productStatus.utils';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly dataSourceRepo: Repository<Product>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Product>): Promise<Product | null> {
    const product = this.dataSourceRepo.findOne({ where });
    if (product === null) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async findAllActive(): Promise<Product[]> {
    return this.dataSourceRepo.find({
      relations: {
        categories: true,
      },
      where: { productStatus: Status.ACTIVE },
    });
  }

  async countIfExist(where: FindOptionsWhere<Product>): Promise<number> {
    return this.dataSourceRepo.countBy(where);
  }

  async updateByPrice(
    updateProduct: Product,
    productPrice: number,
  ): Promise<Product> {
    const productUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateProduct.id },
    });

    if (productUpdate === null) {
      throw new NotFoundException('product not found');
    }
    productUpdate.price = productPrice;
    return this.dataSourceRepo.save(productUpdate);
  }
  async updateByStatus(updateProduct: Product): Promise<Product> {
    const productUpdate = await this.dataSourceRepo.findOne({
      where: { id: updateProduct.id },
    });

    if (productUpdate === null) {
      throw new NotFoundException('product not found');
    }
    productUpdate.productStatus = Status.DISABLED;
    return this.dataSourceRepo.save(productUpdate);
  }

  async removeProduct(
    where: FindOptionsWhere<Product>,
  ): Promise<Product | null> {
    const productToDelete = await this.dataSourceRepo.findOne({ where });

    if (!productToDelete) {
      throw new NotFoundException('Product not found');
    }

    return this.dataSourceRepo.remove(productToDelete);
  }
}
