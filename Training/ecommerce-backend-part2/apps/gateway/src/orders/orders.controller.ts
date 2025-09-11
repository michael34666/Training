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
import { ICreateOrderDTO } from '@ecommerce/types';
import { IAmountInput } from '@ecommerce/types';
import { IOrder } from '@ecommerce/types';
import { IProductOrder } from '@ecommerce/types';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  @Get()
  @ApiOkResponse({ type: [IOrder] })
  async getAllOrders(): Promise<IOrder[]> {
    return firstValueFrom(this.orderClient.send({ cmd: 'get_all_orders' }, {}));
  }

  @Delete('/:id')
  @ApiOkResponse({ type: IOrder })
  async remove(@Param('id') orderId: number): Promise<IOrder> {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'remove_order_by_id' }, { orderId }),
    );
  }

  @Patch('/:id/change-amount')
  @ApiOkResponse({ type: IProductOrder })
  async updateProductOrderAmount(
    @Param('id') orderId: number,
    @Body() updateAmount: IAmountInput,
  ): Promise<IProductOrder> {
    return firstValueFrom(
      this.orderClient.send(
        { cmd: 'update_amount_by_id' },
        { orderId: +orderId, updateAmount },
      ),
    );
  }

  @Post()
  @ApiBody({ type: ICreateOrderDTO })
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
  })
  async addNew(@Body() newOrder: ICreateOrderDTO): Promise<IProductOrder> {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'add_new_order' }, newOrder),
    );
  }

  @Get('/with-products-and-categories')
  @ApiOkResponse({ type: IProductOrder })
  async getOrdersWithProductsAndCategories(): Promise<IProductOrder> {
    return firstValueFrom(
      this.orderClient.send(
        { cmd: 'find_orders_with_products_and_categories' },
        {},
      ),
    );
  }
}
