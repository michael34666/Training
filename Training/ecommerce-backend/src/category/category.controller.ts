import { Controller, Get, Param } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('/category')
export class CategoryController {
  constructor(private readonly productService: CategoryService) {}

  @Get()
 async getAllProduct(req: Request, res: Response): Promise<Category[] | null> {
    return await this.productService.findAll();
  }
}
