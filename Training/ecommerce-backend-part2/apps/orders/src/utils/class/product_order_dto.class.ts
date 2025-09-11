import {IProductOrderDTO} from '@ecommerce/types'
export class ProductOrderDTO implements IProductOrderDTO {
  id: number;
  amount: number;
}
