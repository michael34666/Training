import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async findAll(): Promise<Category[] | null> {
    const category = await this.repository.findAll();
    if (!category) {
      throw new Error('Category dont found');
    }
    return category;
  }
}
