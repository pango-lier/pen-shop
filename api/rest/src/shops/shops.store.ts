import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateAproveShopDto, UpdateShopDto } from './dto/update-shop.dto';
import { User } from 'src/users/entities/user.entity';
import slugify from 'slugify';

@Injectable()
export class ShopsStore {
  constructor(
    @InjectRepository(Shop) private readonly baseRepo: Repository<Shop>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateShopDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(createDto.name.toLowerCase(), '-');
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateShopDto | UpdateAproveShopDto) {
    const create = await this.baseRepo.findOne({ where: { id } });

    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async findBySlug(slug: string) {
    return await this.baseRepo.findOne({
      where: [{ slug }],
    });
  }

  async findByStaffId(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
      relations: {
        staffs: true,
      },
    });
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.baseRepo.createQueryBuilder('shop');
    query.leftJoinAndSelect('shop.owner', 'owner');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'shop',
      getQuery: 'getMany',
    });
  }

  async findStaffPaginate(paginate: IPaginate, shopId: number) {
    const query = this.userRepo.createQueryBuilder('users');
    query.where('users.shop_id = :shopId', { shopId });
    // query.leftJoinAndSelect('shops.permissions', 'permissions');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'users',
      getQuery: 'getMany',
    });
  }

  async findByName(name: string) {
    return await this.baseRepo.findOne({
      where: { name },
    });
  }

  repo() {
    return this.baseRepo;
  }
}
