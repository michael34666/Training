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


@Controller('products')
export class ProductController {
  constructor(@Inject('PRODUCTS_SERVICE') private productClient: ClientProxy) {}

  @Get('/:id')
  async findProduct(@Param('id') id: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_by_id' }, { id }),
    );
  }

  @Get()
  async getAllProduct() {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_all_product' }, {}),
    );
  }

  @Get('/:id/is-exsit')
  async isExist(@Param('id') productId: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'is_product_exsit' }, { productId }),
    );
  }

  @Delete('/:id')
  async remove(@Param('id') productId: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'remove_product_by_id' }, { productId }),
    );
  }

  

  @Patch('/:id/change-status')
  async updateByStatus(@Param('id') productId: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'change_product_status' }, { productId }),
    );
  }
}
