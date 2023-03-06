import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorStore {
  constructor(
    @InjectRepository(Author)
    private readonly baseRepo: Repository<Author>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateAuthorDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(create.name);
    create.translated_languages = ['en'];
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateAuthorDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    // create.slug = slugify(updateDto.name);
    // updateDto.values = updateDto.values?.map((i) => {
    //   const { id, ...rest } = i;
    //   if (i.id) return { ...i, id: id + '' };
    //   return rest as any;
    // });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(author) {
    console.log(author);
    return await this.baseRepo.find();
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
    });
  }

  async findPaginate(paginate?: IPaginate) {
    const query = this.baseRepo.createQueryBuilder('author');
    //  query.leftJoinAndSelect('types.banners', 'banners');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'author',
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
