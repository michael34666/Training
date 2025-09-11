import { ProductOrderDTO } from './product_order_dto.class';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateOrderDTO } from '@ecommerce/types';

export class CreateOrderDTO implements ICreateOrderDTO {
  uploadDate: string;
  products: ProductOrderDTO[];
}
