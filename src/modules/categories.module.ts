import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CategoriesController } from 'src/controllers/categories.controller';
import { Category } from 'src/entities/categories.entity';
import { CategoriesService } from 'src/service/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, JwtStrategy],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoryModule {}
