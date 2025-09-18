import { ProductOrderDTO } from '../order/product-order-dto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({ type: String })
  uploadDate: string;

  @ApiProperty({ type: () => [ProductOrderDTO] })
  products: ProductOrderDTO[];
}
