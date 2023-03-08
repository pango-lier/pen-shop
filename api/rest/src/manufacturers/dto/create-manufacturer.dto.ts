import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Manufacturer } from '../entities/manufacturer.entity';

export class CreateManufacturerDto extends PickType(Manufacturer, [
  'cover_image',
  'description',
  'image',
  'name',
  'products_count',
  'slug',
  'socials',
  'type',
  'type_id',
  'website',
  'translated_languages',
]) {
  shop_id?: string;
}
