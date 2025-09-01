import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
}
