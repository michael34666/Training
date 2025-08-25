import { Controller, Get, Param } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly productService: CategoryService) {}

  @Get()
  async getAllProduct(): Promise<Category[]> {
    return this.productService.findAll();
  }
}
