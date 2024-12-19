import { Pagination } from 'src/common/paginate';
import { Category } from 'src/database/entities/category.entity';
import { ProductImage } from 'src/database/entities/product-image.entity';

export class ProductResponse {
  id: number;

  name: string;

  description: string;

  thumbnail: string;

  price: number;

  quantity: number;

  status: number;

  isActive: number;

  product_images: ProductImage[];

  category: Category;
}
export class GetListProductResponse extends Pagination<ProductResponse> {
    data: ProductResponse[];
}