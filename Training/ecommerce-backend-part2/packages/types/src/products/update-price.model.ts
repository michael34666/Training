import { ApiProperty } from '@nestjs/swagger';

export class IPriceInput {
  @ApiProperty({
    type: Number,
  })
  changePrice: number;
}
