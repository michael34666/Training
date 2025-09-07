import { ProductOrderDto } from '../types/product_order_dto.type';

export interface CreateOrderDTO {
  uploadDate: string;
  products: ProductOrderDto[];
}
