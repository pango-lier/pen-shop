import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateAproveShopDto, UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import shopsJson from '@db/shops.json';
import Fuse from 'fuse.js';
import { GetShopsDto } from './dto/get-shops.dto';
import { paginate } from 'src/common/pagination/paginate';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { ShopsStore } from './shops.store';
import { query } from 'express';

const shops = plainToClass(Shop, shopsJson);
const options = {
  keys: ['name', 'type.slug', 'is_active'],
  threshold: 0.3,
};
const fuse = new Fuse(shops, options);

@Injectable()
export class ShopsService {
  constructor(private readonly shopStore: ShopsStore) { }
  private shops: Shop[] = shops;

  async create(createShopDto: CreateShopDto) {
    return await this.shopStore.create(createShopDto);
  }

  async getShops(paginate: GetShopsDto) {
    return await this.shopStore.findPaginate(paginate);
  }

  async getStaffs(paginate: GetStaffsDto) {
    return await this.shopStore.findStaffPaginate(paginate, paginate.shop_id);
  }

  async getShop(slug: string): Promise<Shop> {
    return await this.shopStore.findBySlug(slug);
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    return await this.shopStore.update(id, updateShopDto);
  }

  async approve(id: number) {
    const user: UpdateAproveShopDto = {
      is_active: true,
    }
    return await this.shopStore.update(id, user);
  }

  async remove(id: number) {
    return await this.shopStore.repo().softDelete(id);
  }

  async disapproveShop(id: number) {
    const user: UpdateAproveShopDto = {
      is_active: false,
    }
    return await this.shopStore.update(id, user);
  }

  async approveShop(id: number) {
    const user: UpdateAproveShopDto = {
      is_active: false,
    }
    return await this.shopStore.update(id, user);
  }
}
