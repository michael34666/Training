import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  @Get()
  async getAllOrders() {
    return firstValueFrom(this.orderClient.send({ cmd: 'get_all_order' }, {}));
  }

  @Delete('/:id')
  async remove(@Param('id') orderId: number) {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'remove_order_by_id' }, { orderId }),
    );
  }

  @Patch('/:id/change-amount')
  async changeAmount(@Param('id') orderId: number, @Body() updateAmount) {
  
 
    return firstValueFrom(
      this.orderClient.send(
        { cmd: 'change_amount_by_id' },
        { orderId, updateAmount },
      ),
    );
  }

  @Post()
  async addNewOrder(@Body() newOrder) {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'add_new_order' }, newOrder),
    );
  }

  @Get('/product-order-category')
  async showOrderProduct() {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'show_order_product' }, {}),
    );
  }
  @Get('/category/:category')
  async getOrdersByCategory(@Param('category') category: string) {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'show_order_by_category' }, { category }),
    );
  }
}
