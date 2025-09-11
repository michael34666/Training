import { IProductOrderDTO } from '../order/product_order_dto.model';
import { ApiProperty } from '@nestjs/swagger';

export class ICreateOrderDTO {
  @ApiProperty({ type: String })
  uploadDate: string;

  @ApiProperty({ type: [IProductOrderDTO] })
  products: IProductOrderDTO[];
}
