import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly eccomrceService: ProductService) {}

  @Get(':id')
  findProduct(@Param('id') id: number) {
    return this.eccomrceService.findOne(id);
  }

  @Get()
  getAllProduct(req: Request, res: Response): void {
    return this.eccomrceService.findAll();
  }
  @Post()
  create(@Body() createProduct: Product): void {
    return this.eccomrceService.create(createProduct);
  }
}
