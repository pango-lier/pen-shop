import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import couponsJson from '@db/coupons.json';
import Fuse from 'fuse.js';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { paginate } from 'src/common/pagination/paginate';
import { CouponsStore } from './coupons.store';

const coupons = plainToClass(Coupon, couponsJson);
const options = {
  keys: ['code'],
  threshold: 0.3,
};
const fuse = new Fuse(coupons, options);

@Injectable()
export class CouponsService {
  constructor(
    private readonly couponStore: CouponsStore,
  ) { }
  private coupons: Coupon[] = coupons;

  create(createCouponDto: CreateCouponDto) {
    return this.couponStore.create(createCouponDto);
  }

  getCoupons(getDto: GetCouponsDto) {
    return this.couponStore.findPaginate(getDto);
    // if (!page) page = 1;
    // if (!limit) limit = 12;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // let data: Coupon[] = this.coupons;
    // // if (text?.replace(/%/g, '')) {
    // //   data = fuse.search(text)?.map(({ item }) => item);
    // // }

    // if (search) {
    //   const parseSearchParams = search.split(';');
    //   const searchText: any = [];
    //   for (const searchParam of parseSearchParams) {
    //     const [key, value] = searchParam.split(':');
    //     // TODO: Temp Solution
    //     if (key !== 'slug') {
    //       searchText.push({
    //         [key]: value,
    //       });
    //     }
    //   }

    //   data = fuse
    //     .search({
    //       $and: searchText,
    //     })
    //     ?.map(({ item }) => item);
    // }

    // const results = data.slice(startIndex, endIndex);
    // const url = `/coupons?search=${search}&limit=${limit}`;
    // return {
    //   data: results,
    //   ...paginate(data.length, page, limit, results.length, url),
    // };
  }

  getCoupon(param: string, language: string): Promise<Coupon> {
    return this.couponStore.findByCodeAndLanguage(param, language);
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return this.couponStore.update(id, updateCouponDto);
  }

  remove(id: number) {
    return this.couponStore.softDelete(id);
  }

  verifyCoupon(code: string) {
    return {
      is_valid: true,
      coupon: {
        id: 9,
        code: code,
        description: null,
        image: {
          id: 925,
          original:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/925/5x2x.png',
          thumbnail:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/925/conversions/5x2x-thumbnail.jpg',
        },
        type: 'fixed',
        amount: 5,
        active_from: '2021-03-28T05:46:42.000Z',
        expire_at: '2024-06-23T05:46:42.000Z',
        created_at: '2021-03-28T05:48:16.000000Z',
        updated_at: '2021-08-19T03:58:34.000000Z',
        deleted_at: null,
        is_valid: true,
      },
    };
  }
}
