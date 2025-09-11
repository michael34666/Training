import { ApiProperty } from '@nestjs/swagger';
import {IPriceInput} from '@ecommerce/types';

export class PriceInput implements IPriceInput {
  @ApiProperty({
    type: Number,
  })
  changePrice: number;
}
