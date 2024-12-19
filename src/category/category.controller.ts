import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoriesResponse } from './responses/get-categories.response';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get('/')
  async getCategories(): Promise<GetCategoriesResponse> {
    return this.categoryService.getCategories();
  }
}
