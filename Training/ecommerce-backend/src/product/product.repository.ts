import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class EvaluationFormTemplateRepository {
  constructor(
    @InjectRepository(Product)
    private readonly dataSourceRepo: Repository<Product>,
  ) {}
}
