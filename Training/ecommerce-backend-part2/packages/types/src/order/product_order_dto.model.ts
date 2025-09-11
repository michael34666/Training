import { ApiProperty } from '@nestjs/swagger';

export class IProductOrderDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  amount: number;
}
