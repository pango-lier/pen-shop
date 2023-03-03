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
    create.translated_languages = ['en'];
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateAttributeDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    create.slug = slugify(updateDto.name);
    updateDto.values = updateDto.values?.map((i) => {
      const { id, ...rest } = i;
      if (i.id) return { ...i, id: id + '' };
      return rest as any;
    });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(attribute) {
    console.log(attribute);
    return await this.baseRepo.find({
      relations: {
        values: true,
      },
    });
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
      relations: {
        values: true,
      },
    });
  }

  async findPaginate(paginate?: IPaginate) {
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

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}
