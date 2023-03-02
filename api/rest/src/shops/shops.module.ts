import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  ApproveShopController,
  DisapproveShopController,
  ShopsController,
  StaffsController,
} from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopsStore } from './shops.store';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop,User])],
  controllers: [
    ShopsController,
    StaffsController,
    DisapproveShopController,
    ApproveShopController,
  ],
  providers: [ShopsService, ShopsStore],
})
export class ShopsModule { }
