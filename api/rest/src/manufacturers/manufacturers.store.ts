import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { GetManufacturersDto } from './dto/get-manufactures.dto';
import slugify from 'slugify';

@Injectable()
export class ManufacturersStore {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly baseRepo: Repository<Manufacturer>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateManufacturerDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(createDto.name.toLowerCase(), '-');
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateManufacturerDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    create.slug = slugify(updateDto.name.toLowerCase(), '-');
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(manufacturer) {
    return await this.baseRepo.find();
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
    });
  }

  async findPaginate(getManufacturersDto: GetManufacturersDto) {
    const paginate = this.paginate.mapPaginate(getManufacturersDto);
    const query = this.baseRepo.createQueryBuilder('manufacturer');
    query.leftJoinAndSelect('manufacturer.type', 'type');
    query.leftJoinAndSelect('manufacturer.image', 'image');
    query.leftJoinAndSelect('manufacturer.cover_image', 'cover_image');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'manufacturer',
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
