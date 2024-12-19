import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { GetListProductsQueryDto } from './dtos/get-list-products-query.dto';
import {
  GetListProductResponse,
  ProductResponse,
} from './response/get-list-products.response';
import { ProductService } from './product.service';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  getAllProducts(
    @Query() dto: GetListProductsQueryDto,
  ): Promise<GetListProductResponse> {
    return this.productService.getAllProducts(dto);
  }
  @Get('images/:imageName')
  async viewImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', 'uploads', imageName);
    console.log(imagePath);
    try {
      const imageStream = createReadStream(imagePath);
      imageStream.on('open', () => {
        res.setHeader('Content-Type', 'image/jpeg'); // Đặt loại nội dung
        imageStream.pipe(res);
      });

      imageStream.on('error', (err) => {
        res.status(HttpStatus.NOT_FOUND).send('Image not found');
      });
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponse> {
    console.log('detail');
    return this.productService.getProduct(id);
  }

  @Get('by-ids')
  async getProductsByIds(
    @Query('ids') ids: string,
  ): Promise<ProductResponse[]> {
    // Tách chuỗi ids thành mảng số
    const listIds = ids.split(',').map((id) => parseInt(id, 10));

    // Kiểm tra nếu có giá trị không phải là số
    if (listIds.some((id) => isNaN(id))) {
      throw new Error('Invalid IDs');
    }

    return this.productService.getProductsByIds(listIds);
  }
  

}
