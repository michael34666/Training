import { ApiProperty } from '@nestjs/swagger';
import { IProductOrder } from '../productOrder/product-order.model';

export class IOrder {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  uploadDate: string;

  @ApiProperty({ type: [IProductOrder] })
  productsOrder: IProductOrder[];
}
