import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Product, ProductType } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { CategoryStore } from '../categories/categories.store';
import { TagsStore } from '../tags/tags.store';
import { AttributeStore } from '../attributes/attributes.store';
import { AttributeValue } from '../attributes/entities/attribute-value.entity';

@Injectable()
export class ProductsStore {
  constructor(
    @InjectRepository(Product)
    private readonly baseRepo: Repository<Product>,
    @InjectRepository(AttributeValue)
    private readonly attributeValue: Repository<AttributeValue>,
    private readonly categoryStore: CategoryStore,
    private readonly tagStore: TagsStore,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateProductDto) {
    const { categories, tags, variations, ...rest } = createDto;
    const create = this.baseRepo.create(rest);
    create.slug = slugify(create.name.toLowerCase(), '-');
    create.categories = await this.categoryStore.findByIds(
      createDto.categories,
    );
    create.tags = await this.tagStore.findByIds(createDto.tags);
    if (create.product_type === ProductType.VARIABLE) {
      const attributeValueIds = variations.map((i) => {
        return i.attribute_value_id;
      });
      const attributeValues = await this.attributeValue.find({
        where: { id: In(attributeValueIds) },
      });
      create.variations = attributeValues;
    }
    console.log(create);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateProductDto) {
    const { categories, tags, ...rest } = updateDto;
    const create = await this.baseRepo.findOne({ where: { id } });
    create.categories = await this.categoryStore.findByIds(
      updateDto.categories,
    );
    create.tags = await this.tagStore.findByIds(updateDto.tags);
    return await this.baseRepo.save(create);
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async findBySlug(slug: string) {
    return await this.baseRepo.findOne({
      where: [{ slug }],
      relations: {
        shop: true,
        gallery: true,
        categories: true,
        tags: true,
        image: true,
        variations: true,
      },
    });
  }

  async all(getProductDto: GetProductsDto) {
    const paginate = this.paginate.mapPaginate(getProductDto);
    const query = this.baseRepo.createQueryBuilder('product');
    query.leftJoinAndSelect('product.shop', 'shop');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'shop.name', 'note', 'status'],
      {
        defaultTable: 'product',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getProductDto: GetProductsDto) {
    const paginate = this.paginate.mapPaginate(getProductDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('product');
    query.leftJoinAndSelect('product.shop', 'shop');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'shop.name', 'status'],
      {
        defaultTable: 'product',
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
