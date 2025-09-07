import { Controller, Get } from '@nestjs/common';
import { ProductsOrderService } from './products-order.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsOrder } from './products-order.entity';
import { AmountInput } from '../utils/types/input.type';


@Controller('orders')
export class ProductsOrderController {
  constructor(private readonly productsOrderService: ProductsOrderService) {}

  @MessagePattern({ cmd: 'change_amount_by_id' })
  async updateByAmount(payload: {
    orderId: ProductsOrder['id'];
    updateAmount: AmountInput;
  }): Promise<ProductsOrder> {
    
    return this.productsOrderService.updateByAmount(
      payload.orderId,
      payload.updateAmount,
    );
  }
}

