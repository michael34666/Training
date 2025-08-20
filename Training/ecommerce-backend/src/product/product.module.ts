import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // QUESTION: Explain to me what is it
  controllers: [ProductController],
  providers: [ProductService],
}) // TODO: Add here the needed providers and export the needed, import here modules if needed
export class ProductModule {}
