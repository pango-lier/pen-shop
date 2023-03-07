import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateBannerDto, CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

import typesJson from '@db/types.json';
import Fuse from 'fuse.js';
import { GetTypesDto } from './dto/get-types.dto';
import { TypesStore } from './types.store';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';

const types = plainToClass(Type, typesJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(types, options);

@Injectable()
export class TypesService {
  constructor(private readonly typeStore: TypesStore) {}
  private types: Type[] = types;

  async getTypes(typeDtos: GetTypesDto) {
    const paginate: IPaginate = {};
    return (await this.typeStore.findPaginate(paginate)).data;
  }

  getTypesOld({ text, search }: GetTypesDto) {
    let data: Type[] = this.types;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    return data;
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeStore.findBySlug(slug);
  }

  async create(createTypeDto: CreateTypeDto) {
    createTypeDto.banners = createTypeDto.banners?.map((i) => {
      return {
        title: i.title,
        description: i?.description,
        image: {
          original:
            'https://admin-pickbazar-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1847%2Fconversions%2F275640572_108626431775341_6628217905140713890_n-thumbnail.jpg&w=1920&q=75',
          thumbnail:
            'https://admin-pickbazar-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1847%2Fconversions%2F275640572_108626431775341_6628217905140713890_n-thumbnail.jpg&w=1920&q=75',
        },
      } as CreateBannerDto;
    });
    // console.log(createTypeDto.banners);
    // return createTypeDto;
    return await this.typeStore.create(createTypeDto);
  }

  async findAll() {
    return await this.typeStore.all();
  }

  async findOne(id: number) {
    return this.typeStore.findById(id);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    return await this.typeStore.update(id, updateTypeDto);
  }

  remove(id: number) {
    return this.typeStore.repo().softDelete(id);
  }
}
