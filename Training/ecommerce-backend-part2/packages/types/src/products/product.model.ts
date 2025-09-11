import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../categories/category.model';
import { Status } from '../enums/status.enum';

export class IProduct {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  productName: string;
  @ApiProperty({ type: String })
  uploadDate: string;
  @ApiProperty({ type: String })
  productDescription: string;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: String })
  sellerName: string;
  @ApiProperty({ type: String })
  imageUrl: string;
  @ApiProperty({ enum: ['ACTIVE', 'DISABLED'] })
  productStatus: Status;
  @ApiProperty({ type: [ICategory] })
  categories: ICategory[];
}
