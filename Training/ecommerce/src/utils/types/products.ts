export interface Product {
  id: number;
  name: string;
  uploadDate: string;
  description: string;
  price: number;
  sellerName: string;
  imageUrl: string;
  category: string;
  quantity: number | 0;
  additionalInfo: {
    cpu: string;
    camera: string;
    display: string;
    storageOptions: string[];
  };
}