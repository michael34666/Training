import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Product } from './product.entity';
import { Status } from '../utils/enums/productStatus.enum';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly dataSourceRepo: Repository<Product>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Product>): Promise<Product | null> {
    return await this.dataSourceRepo.findOne({ where });
  }

  async findAllActive(): Promise<Product[]> {
    return this.dataSourceRepo.find({
      relations: {
        categories: true,
      },
      where: { productStatus: Status.ACTIVE },
    });
  }

  async countIfExist(where: FindOptionsWhere<Product>): Promise<Boolean> {
    return this.dataSourceRepo.exists({ where });
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

  async removeProduct(where: FindOptionsWhere<Product>): Promise<Product> {
    const productToDelete = await this.dataSourceRepo.findOne({ where });

    if (!productToDelete) {
      throw new NotFoundException('Product not found');
    }

    return this.dataSourceRepo.remove(productToDelete);
  }
}
