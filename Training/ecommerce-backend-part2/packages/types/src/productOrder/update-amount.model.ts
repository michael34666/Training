import { ApiProperty } from '@nestjs/swagger';

export class AmountInput {
  @ApiProperty({ type: Number })
  changeAmount: number;
}
