import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends OmitType(Product, [
  'id',
  'slug',
  'created_at',
  'updated_at',
  'status',
  'orders',
  'pivot',
  'shop',
  'categories',
  'tags',
  'type',
  'related_products',
  // 'variation_options',
  'variations',
  // 'translated_languages',
]) {
  categories: number[];
  tags: number[];
  variations: any[];
}
