import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';
import { ProductsStore } from './products.store';
import { CategoryStore } from '../categories/categories.store';
import { TagsStore } from '../tags/tags.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { AttributeValue } from '../attributes/entities/attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Tag, AttributeValue])],
  controllers: [ProductsController, PopularProductsController],
  providers: [ProductsService, ProductsStore, CategoryStore, TagsStore],
})
export class ProductsModule {}
