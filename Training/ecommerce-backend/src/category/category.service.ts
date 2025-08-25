import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
