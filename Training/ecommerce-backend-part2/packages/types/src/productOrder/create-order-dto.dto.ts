import { ProductOrderDTO } from '../order/product_order_dto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({ type: String })
  uploadDate: string;

  @ApiProperty({ type: [ProductOrderDTO] })
  products: ProductOrderDTO[];
}
