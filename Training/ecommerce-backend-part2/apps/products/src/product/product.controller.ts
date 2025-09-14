import { Controller, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import type { PriceInput } from '@ecommerce/types';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'get_by_id' })
  async getById(payload: { id: number }): Promise<Product> {
    return this.productService.getById(payload.id);
  }

  @MessagePattern({ cmd: 'get_all_product' })
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'is_product_exsit' })
  async isExist(payload: { productId: Product['id'] }): Promise<Boolean> {
    return this.productService.isExists(payload.productId);
  }

  @MessagePattern({ cmd: 'remove_product_by_id' })
  async remove(payload: { productId: Product['id'] }): Promise<Product> {
    return this.productService.remove(payload.productId);
  }

  @MessagePattern({ cmd: 'update_product_price' })
  async updatePrice(payload: {
    productId: Product['id'];
    updatePrice: PriceInput;
  }): Promise<Product> {
    return this.productService.updatePrice(
      payload.productId,
      payload.updatePrice,
    );
  }

  @MessagePattern({ cmd: 'change_product_status' })
  async updateStatus(payload: { productId: Product['id'] }): Promise<Product> {
    return this.productService.updateStatus(payload.productId);
  }

  @MessagePattern({ cmd: 'is_products_exist' })
  async isExsits(payload: { productsIds: number[] }): Promise<boolean> {
    const productExist = await Promise.all(
      payload.productsIds?.map((id) => this.isExist({ productId: id })),
    );
    return !productExist.some((exist) => !exist);
  }

  @MessagePattern({ cmd: 'find_products_by_ids' })
  async findByIds(productIds: number[]): Promise<Product[]> {
    return this.productService.findByIds(productIds);
  }
}
