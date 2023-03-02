import { PartialType, PickType } from '@nestjs/swagger';
import { Shop } from '../entities/shop.entity';
import { CreateShopDto } from './create-shop.dto';

export class UpdateShopDto extends PartialType(CreateShopDto) { }
export class UpdateAproveShopDto extends PickType(Shop, ['is_active']) { }