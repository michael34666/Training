import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  amount: number;
}
