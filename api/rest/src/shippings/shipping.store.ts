import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { UsersService } from 'src/users/users.service';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';

@Injectable()
export class ShippingStore {
  constructor(
    @InjectRepository(Shipping)
    private readonly baseRepo: Repository<Shipping>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateShippingDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateShippingDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(Shipping) {
    return await this.baseRepo.find();
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
    });
  }

  async findPaginate(getShippingsDto: GetShippingsDto) {
    const paginate = this.paginate.mapPaginate(getShippingsDto);
    const query = this.baseRepo.createQueryBuilder('shipping');
    //  query.leftJoinAndSelect('types.banners', 'banners');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'shipping',
      getQuery: 'getMany',
    });
  }

  async findByName(name: string) {
    return await this.baseRepo.findOne({
      where: { name },
    });
  }

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}
