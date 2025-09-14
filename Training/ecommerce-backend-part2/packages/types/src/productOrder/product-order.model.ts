import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order/order.model';

export class IProductOrder {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: IOrder })
  order: IOrder;

  @ApiProperty({ type: Number })
  productId: number;

  @ApiProperty({ type: Number })
  amount: number;
}
