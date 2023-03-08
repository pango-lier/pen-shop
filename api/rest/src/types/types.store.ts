import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { Type } from './entities/type.entity';
import { UsersService } from 'src/users/users.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import slugify from 'slugify';

@Injectable()
export class TypesStore {
  constructor(
    @InjectRepository(Type) private readonly baseRepo: Repository<Type>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateTypeDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(create.name);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateTypeDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    create.slug = slugify(updateDto.name);
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all() {
    return await this.baseRepo.find();
  }

  async findBySlug(slug: string, language: string) {
    return await this.baseRepo.findOne({
      where: [{ slug, language }],
    });
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.baseRepo.createQueryBuilder('types');
    //  query.leftJoinAndSelect('types.banners', 'banners');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'types',
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
