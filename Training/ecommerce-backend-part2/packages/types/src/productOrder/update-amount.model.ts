import { ApiProperty } from '@nestjs/swagger';

export class IAmountInput {
  @ApiProperty({ type: Number })
  changeAmount: number;
}
