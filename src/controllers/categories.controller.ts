import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from 'src/service/categories.service';
import { Category } from 'src/entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategories() {
    try {
      return await this.categoriesService.findCategories();
    } catch (error) {
      console.error('/categories/get', error);
      throw new Error('Something went wrong');
    }
  }
}
