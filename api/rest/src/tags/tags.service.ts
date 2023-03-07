import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import tagsJson from '@db/tags.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { TagsStore } from './tags.store';

const tags = plainToClass(Tag, tagsJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(tags, options);

@Injectable()
export class TagsService {
  constructor(private readonly tagStore: TagsStore) { }
  private tags: Tag[] = tags;

  create(createTagDto: CreateTagDto) {
    return this.tagStore.create(createTagDto);
  }

  findAll(getTagsDto: GetTagsDto) {
    return this.tagStore.findPaginate(getTagsDto);
    // if (!page) page = 1;
    // let data: Tag[] = this.tags;

    // if (search) {
    //   const parseSearchParams = search.split(';');
    //   const searchText: any = [];
    //   for (const searchParam of parseSearchParams) {
    //     const [key, value] = searchParam.split(':');
    //     // TODO: Temp Solution
    //     if (key !== 'slug') {
    //       searchText.push({
    //         [key]: value,
    //       });
    //     }
    //   }

    //   data = fuse
    //     .search({
    //       $and: searchText,
    //     })
    //     ?.map(({ item }) => item);
    // }

    // const url = `/tags?limit=${limit}`;
    // return {
    //   data,
    //   ...paginate(this.tags.length, page, limit, this.tags.length, url),
    // };
  }

  findOne(param: string, language: string) {
    return this.tagStore.findByIdOrSlug(param, language);
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagStore.update(id, updateTagDto)
  }

  remove(id: number) {
    return this.tagStore.softDelete(id);
  }
}
