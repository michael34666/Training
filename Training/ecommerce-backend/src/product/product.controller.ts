import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { NOTFOUND } from 'dns';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async findProduct(
    @Param('id') productId: Product['id'],
  ): Promise<Product | null> {
    try {
      return await this.productService.findOne(productId);
    } catch (e) {
      throw new NotFoundException('Product not Found');
    }
  }

  @Get()
  async getAllProduct(): Promise<Product[] | null> {
    try {
      return await this.productService.findAll();
    } catch (e) {
      throw new Error('Product not Found');
    }
  }

  @Get(':id/isExist')
  async isExist(@Param('id') productId: Product['id']): Promise<Boolean> {
    try {
      return await this.productService.isExists(productId);
    } catch (e) {
      throw new Error('Product not Found');
    }
  }

  @Put(':id/changePrice')
  async updateByPrice(
    @Param('id') productId: Product['id'],
    @Body() updatePrice: JSON,
  ) {
    try {
      return await this.productService.updateByPrice(productId, updatePrice);
    } catch (e) {
      throw new Error('Product not Found');
    }
  }

  @Put(':id/changeStatus')
  async updateByStatus(@Param('id') productId: Product['id']) {
    try {
      return await this.productService.updateByStatus(productId);
    } catch (e) {
      throw new Error('Product not Found');
    }
  }
  @Delete(':id')
  async remove(@Param('id') productId: Product['id']) {
    try {
      const deletedProduct = this.productService.removeProduct(productId);
      return await this.productService.findOne(productId);
    } catch (e) {
      throw new Error('Product not Found');
    }
  }
}
