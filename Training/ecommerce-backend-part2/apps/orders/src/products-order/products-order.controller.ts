import { Controller, Get } from '@nestjs/common';
import { ProductsOrderService } from './products-order.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductOrder } from './products-order.entity';
import { AmountInput } from '@ecommerce/types';

@Controller('orders')
export class ProductsOrderController {
  constructor(private readonly productsOrderService: ProductsOrderService) {}

  @MessagePattern({ cmd: 'update_amount_by_id' })
  async updateAmount(payload: {
    orderId: ProductOrder['id'];
    updateAmount: AmountInput;
  }): Promise<ProductOrder[]> {
    return this.productsOrderService.updateAmount(
      payload.orderId,
      payload.updateAmount,
    );
  }
}
