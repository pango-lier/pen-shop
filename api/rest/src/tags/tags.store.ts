import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { User } from 'src/users/entities/user.entity';
import slugify from 'slugify';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsStore {
  constructor(
    @InjectRepository(Tag) private readonly baseRepo: Repository<Tag>,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateTagDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(createDto.name.toLowerCase(), '-');
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateTagDto) {
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

  async findByIdOrSlug(idOrSlug: string, language = 'en') {
    let filter: any = { slug: idOrSlug, language };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
      relations: {
        type: true,
        image: true,
      },
    });
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.baseRepo.createQueryBuilder('tags');
    query.leftJoinAndSelect('tags.type', 'type');
    query.leftJoinAndSelect('tags.image', 'image');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'tags',
      getQuery: 'getMany',
    });
  }

  async findByName(name: string) {
    return await this.baseRepo.findOne({
      where: { name },
    });
  }

  async remove(id: number) {
    return await this.baseRepo.delete(id);
  }

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}
