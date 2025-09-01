import { Controller, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import type { PriceInput } from '../utils/types/input.type';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'get_by_id' })
  async findProduct(payload: { id: number }): Promise<Product> {
    return this.productService.findOne(payload.id);
  }

  @MessagePattern({ cmd: 'get_all_product' })
  async getAllProduct(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'is_product_exsit' })
  async isExist(payload: { productId: Product['id'] }): Promise<Boolean> {
    return this.productService.isExists(payload.productId);
  }

  @MessagePattern({ cmd: 'remove_product_by_id' })
  async remove(payload: { productId: Product['id'] }): Promise<Product> {
    return this.productService.removeProduct(payload.productId);
  }

  @MessagePattern({ cmd: 'change_product_price' })
  async updateByPrice(payload: {
    productId: Product['id'];
    updatePrice: PriceInput;
  }): Promise<Product> {
    return this.productService.updateByPrice(
      payload.productId,
      payload.updatePrice,
    );
  }

  @MessagePattern({ cmd: 'change_product_status' })
  async updateByStatus(payload: {
    productId: Product['id'];
  }): Promise<Product> {
    return this.productService.updateByStatus(payload.productId);
  }
}
