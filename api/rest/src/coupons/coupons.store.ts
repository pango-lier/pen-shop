import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';

@Injectable()
export class CouponsStore {
  constructor(
    @InjectRepository(Coupon)
    private readonly baseRepo: Repository<Coupon>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) { }

  async create(createDto: CreateCouponDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateCouponDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findByCodeAndLanguage(code: string, language: string) {
    return await this.baseRepo.findOne({
      where: [{ code, language }],
      relations: {
        image: true
      }
    });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getCouponDto: GetCouponsDto) {
    const paginate = this.paginate.mapPaginate(getCouponDto);
    const query = this.baseRepo.createQueryBuilder('coupon');
    query.leftJoinAndSelect('coupon.image', 'image');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'code', 'description'],
      {
        defaultTable: 'coupon',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getCouponDto: GetCouponsDto) {
    const paginate = this.paginate.mapPaginate(getCouponDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('coupon');
    query.leftJoinAndSelect('coupon.image', 'image');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'code', 'description'],
      {
        defaultTable: 'coupon',
        getQuery: 'getMany',
      },
    );
  }

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}
