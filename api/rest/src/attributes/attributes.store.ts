import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Injectable()
export class AttributeStore {
  constructor(
    @InjectRepository(Attribute)
    private readonly baseRepo: Repository<Attribute>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateAttributeDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(create.name);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateAttributeDto) {
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

  async findBySlug(slug: string) {
    return await this.baseRepo.findOne({
      where: [{ slug }],
    });
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.baseRepo.createQueryBuilder('attribute');
    //  query.leftJoinAndSelect('types.banners', 'banners');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'attribute',
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
