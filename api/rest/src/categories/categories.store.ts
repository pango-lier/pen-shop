import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
@Injectable()
export class CategoryStore {
  constructor(
    @InjectRepository(Category)
    private readonly baseRepo: Repository<Category>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateCategoryDto) {
    const create = this.baseRepo.create(createDto);
    create.slug = slugify(create.name);
    create.translated_languages = ['en'];
    //create.parentId = createDto.parent as any;
    if (createDto.parent) {
      create.parent = await this.findById(+createDto.parent);
    }

    console.log(create);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateCategoryDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    create.slug = slugify(updateDto.name);
    // create.parentId = 0;
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async findTrees(getCategoriesDto: GetCategoriesDto) {
    const paginate = await this.paginate.mapPaginate(getCategoriesDto);
    if (paginate.filtered && paginate.filtered.length) {
    }
    return await this.baseRepo.manager.getTreeRepository(Category).findTrees();
  }

  async findAll(getCategoriesDto: GetCategoriesDto) {
    return await this.baseRepo.find();
  }

  async totalItems(attribute = undefined) {
    return await this.baseRepo.manager.getTreeRepository(Category).count();
  }

  async root(attribute) {
    return await this.baseRepo.manager.getTreeRepository(Category).findRoots();
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
    });
  }

  async findPaginate(paginate?: IPaginate) {
    return await this.baseRepo.manager.getTreeRepository(Category).findTrees();
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
