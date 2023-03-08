import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class CreateAuthorDto extends PickType(Author, [
  'bio',
  'born',
  'cover_image',
  'death',
  'image',
  'languages',
  'name',
  'products_count',
  'quote',
  'slug',
  'is_approved',
  'socials',
  'translated_languages',
]) {
  shop_id?: string;
}
