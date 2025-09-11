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
import { IProduct } from '@ecommerce/types';
import { IPriceInput } from '@ecommerce/types';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(@Inject('PRODUCTS_SERVICE') private productClient: ClientProxy) {}

  @Get('/:id')
  @ApiOkResponse({ type: IProduct })
  async findProduct(@Param('id') id: number): Promise<IProduct> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_by_id' }, { id }),
    );
  }

  @Get()
  @ApiOkResponse({ type: [IProduct] })
  async getAllProduct(): Promise<IProduct[]> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_all_product' }, {}),
    );
  }

  @Get('/:id/is-exsit')
  @ApiOkResponse({ type: Boolean })
  async isExist(@Param('id') productId: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'is_product_exsit' }, { productId }),
    );
  }

  @Delete('/:id')
  @ApiOkResponse({ type: IProduct })
  async remove(@Param('id') productId: number): Promise<IProduct> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'remove_product_by_id' }, { productId }),
    );
  }

  @Patch(':id/change-price')
  @ApiOkResponse({ type: IProduct })
  async updatePrice(
    @Param('id') productId: number,
    @Body() updatePrice: IPriceInput,
  ): Promise<IProduct> {
    return firstValueFrom(
      this.productClient.send(
        { cmd: 'update_product_price' },
        { productId, updatePrice },
      ),
    );
  }

  @Patch('/:id/disable')
  @ApiOkResponse({ type: IProduct })
  async updateByStatus(@Param('id') productId: number): Promise<IProduct> {
    return firstValueFrom(
      this.productClient.send({ cmd: 'change_product_status' }, { productId }),
    );
  }
}
