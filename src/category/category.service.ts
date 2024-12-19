import { Injectable } from '@nestjs/common';
import { GetCategoriesResponse } from './responses/get-categories.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>;
  async getCategories(): Promise<GetCategoriesResponse> {
    const records = await this.categoryRepository.find();
    return { data: records };
  }
}
