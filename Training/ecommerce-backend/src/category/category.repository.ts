import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly dataSourceRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[] | null> {
    return await this.dataSourceRepo.find();
  }
}
