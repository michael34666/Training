import { ApiProperty } from '@nestjs/swagger';

export class PriceInput {
  @ApiProperty({
    type: Number,
  })
  changePrice: number;
}
