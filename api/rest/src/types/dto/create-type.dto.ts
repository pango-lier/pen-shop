import { OmitType } from '@nestjs/swagger';
import { Type } from '../entities/type.entity';
import { Banner } from '../entities/banner.entity';

export class CreateBannerDto extends OmitType(Banner, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class CreateTypeDto extends OmitType(Type, [
  'slug',
  'id',
  'created_at',
  'updated_at',
  'banners',
]) {
  banners: CreateBannerDto[];
}
