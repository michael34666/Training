import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../products/product.model';

export class ICategory {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  categoryName: string;

  @ApiProperty({ type: [IProduct] })
  products: IProduct[];
}
