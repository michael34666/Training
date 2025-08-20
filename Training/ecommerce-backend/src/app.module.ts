import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, CategoryModule],  // TODO: *Use the typeorm module here, *Use the configmodule here with global: true
})
export class AppModule {}
