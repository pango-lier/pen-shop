import { Injectable } from '@nestjs/common';
import {
  UpdateApprovalAuthorDto,
  UpdateAuthorDto,
} from './dto/update-author.dto';
import { plainToClass } from 'class-transformer';
import authorsJson from '@db/authors.json';
import { Author } from './entities/author.entity';
import Fuse from 'fuse.js';
import { GetAuthorDto } from './dto/get-author.dto';
import { paginate } from '../common/pagination/paginate';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorStore } from './authors.store';

const authors = plainToClass(Author, authorsJson);

const options = {
  keys: ['name', 'slug'],
  threshold: 0.3,
};

const fuse = new Fuse(authors, options);

@Injectable()
export class AuthorsService {
  constructor(private readonly authorStore: AuthorStore) {}
  private authors: Author[] = authors;

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorStore.create(createAuthorDto);
  }

  getAuthors(paginate: GetAuthorDto) {
    return this.authorStore.findPaginate(paginate);
    // if (!page) page = 1;
    // if (!limit) limit = 30;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // let data: Author[] = this.authors;
    // if (search) {
    //   const parseSearchParams = search.split(';');
    //   for (const searchParam of parseSearchParams) {
    //     const [key, value] = searchParam.split(':');
    //     data = fuse.search(value)?.map(({ item }) => item);
    //   }
    // }

    // const results = data.slice(startIndex, endIndex);

    // const url = `/authors?search=${search}&limit=${limit}`;
    // return {
    //   data: results,
    //   ...paginate(data.length, page, limit, results.length, url),
    // };
  }

  async getAuthorBySlug(slug: string): Promise<Author> {
    return await this.authorStore.findByIdOrSlug(slug);
  }

  async getTopAuthors({ limit = 10 }: GetTopAuthorsDto): Promise<Author[]> {
    return this.authors.slice(0, limit);
  }

  update(
    id: number,
    updateAuthorDto: UpdateAuthorDto | UpdateApprovalAuthorDto,
  ) {
    return this.authorStore.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorStore.softDelete(id);
  }
}
