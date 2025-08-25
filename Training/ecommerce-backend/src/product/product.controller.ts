import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import type { priceInput } from '../utils/types/input.type';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async findProduct(
    @Param('id') productId: Product['id'],
  ): Promise<Product | null> {
    return this.productService.findOne(productId);
  }

  @Get()
  async getAllProduct(): Promise<Product[] | null> {
    return this.productService.findAll();
  }

  @Get(':id/is-exist')
  async isExist(@Param('id') productId: Product['id']): Promise<Boolean> {
    return this.productService.isExists(productId);
  }

  @Patch(':id/change-price')
  async updateByPrice(
    @Param('id') productId: Product['id'],
    @Body() updatePrice: priceInput,
  ) {
    return this.productService.updateByPrice(productId, updatePrice);
  }

  @Patch(':id/change-status')
  async updateByStatus(@Param('id') productId: Product['id']) {
    return this.productService.updateByStatus(productId);
  }
  @Delete(':id')
  async remove(@Param('id') productId: Product['id']) {
    const deletedProduct = this.productService.removeProduct(productId);
    return this.productService.findOne(productId);
  }
}
