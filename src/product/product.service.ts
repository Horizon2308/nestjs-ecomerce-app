import { Injectable } from '@nestjs/common';
import { GetListProductsQueryDto } from './dtos/get-list-products-query.dto';
import {
  GetListProductResponse,
  ProductResponse,
} from './response/get-list-products.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In } from 'typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Pagination } from 'src/common/paginate';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private productReposity: Repository<Product>;

  async getAllProducts(
    dto: GetListProductsQueryDto,
  ): Promise<GetListProductResponse> {
    const where: FindOptionsWhere<Product> = {
      ...(dto.category_id &&
        parseInt(dto.category_id) !== 0 && {
          category_id: {
            id: parseInt(dto.category_id),
          },
        }),
      ...(dto.keyword && {
        name: Like(`%${dto.keyword}%`),
      }),
    };
    const [records, count] = await this.productReposity.findAndCount({
      take: dto.limit,
      skip: dto.limit * dto.page,
      relations: {
        category_id: true,
      },
      where,
    });
    const mappedRecord = records.map((record) => {
      return {
        id: record.id,
        name: record.name,
        description: record.description,
        thumbnail: record.thumbnail,
        price: record.price,
        quantity: record.quantity,
        status: record.status,
        isActive: record.active,
        product_images: record.product_images,
        category: record.category_id,
      } as ProductResponse;
    });
    const response: GetListProductResponse = new Pagination<ProductResponse>({
      count,
      limit: dto.limit,
      data: mappedRecord,
    });
    return response;
  }

  async getProduct(id: number): Promise<ProductResponse> {
    const record = await this.productReposity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_images', 'product_images')
      .where('product.id = :id', { id })
      .getOne();

    if (!record) {
      throw new Error(`Product with id ${id} not found`);
    }

    const mappedRecord = {
      id: record.id,
      name: record.name,
      description: record.description,
      thumbnail: record.thumbnail,
      price: record.price,
      quantity: record.quantity,
      status: record.status,
      isActive: record.active,
      product_images: record.product_images,
      category: record.category_id,
    } as ProductResponse;

    return mappedRecord;
  }

  async getProductsByIds(ids: number[]): Promise<ProductResponse[]> {
    const record = await this.productReposity.find({
      where: {
        id: In(ids),
      },
    });
    const mappedRecord = record.map((record) => {
      return {
        id: record.id,
        name: record.name,
        description: record.description,
        thumbnail: record.thumbnail,
        price: record.price,
        quantity: record.quantity,
        status: record.status,
        isActive: record.active,
        product_images: record.product_images,
        category: record.category_id,
      } as ProductResponse;
    });
    return mappedRecord;
  }
}
