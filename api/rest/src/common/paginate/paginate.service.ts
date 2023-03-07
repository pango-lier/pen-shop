import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IPaginate } from './interface/paginate.interface';
import { IMapPaginate } from './interface/mapPaginate.interface';

@Injectable()
export class PaginateService {
  mapPaginate(input: IMapPaginate) {
    const paginate: IPaginate = {
      limit: +input.limit,
      offset: +input.page - 1 > 0 ? +input.page - 1 : 0 || 0,
      pageIndex: +input.page,
      pageSize: +input.limit,
    };
    if (input.sortedBy) {
      paginate.sorted = [
        {
          id: input.sortedBy,
          desc: input.orderBy.toLowerCase() === 'desc' ? true : false,
        },
      ];
    }
    if (input.search && input.search != '') {
      const parseSearchParams = input.search.split(';');
      const filtered = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        console.log({ id: key, value });
        filtered.push({ id: key, value });
      }
      paginate.filtered = filtered;
    }
    return paginate;
  }

  querySearch<T>(
    query: SelectQueryBuilder<T>,
    filter: IPaginate,
    q: Array<string | number> = [],
    options: {
      defaultTable?: string | undefined;
      operator?: string;
      getQuery?: 'getRawMany' | 'getMany';
    } = { getQuery: 'getRawMany', operator: 'like' },
  ) {
    if (filter.sorted) {
      filter.sorted.forEach((sorted) => {
        let sortedId = sorted.id;
        if (
          options.defaultTable !== undefined &&
          !`${sortedId}`.includes('.')
        ) {
          sortedId = `${options.defaultTable}.${sortedId}`;
        }
        query.orderBy(sortedId, sorted.desc === true ? 'DESC' : 'ASC');
      });
    }
    if (filter.filtered && !filter.q) {
      filter.filtered.forEach((filtered) => {
        if (filtered.id === 'q') filter.q = filtered.value;
      });
    }
    if (filter.q && q.length > 0) {
      query.where(`${q[0]} LIKE :q`, {
        q: `%${filter.q}%`,
      });
      for (let index = 1; index < q.length; index++) {
        const element = q[index];
        query.orWhere(`${element} LIKE :q`, {
          q: `%${filter.q}%`,
        });
      }
    } else if (filter.filtered) {
      filter.filtered.forEach((filtered) => {
        let filteredId = filtered.id;
        if (
          options.defaultTable !== undefined &&
          !`${filteredId}`.includes('.')
        ) {
          filteredId = `${options.defaultTable}.${filteredId}`;
        }
        if (options.operator === 'like') {
          query.where(`${filteredId} ${options.operator} :value`, {
            value: `%${filtered.value}%`,
          });
        } else {
          const operator = filtered.operator || '=';
          query.where(`${filteredId} ${operator} :value`, {
            value: filtered.value,
          });
        }
      });
    }
    return query;
  }

  async queryFilter<T>(
    query: SelectQueryBuilder<T>,
    filter: IPaginate,
    q: Array<string | number> = [],
    options: {
      defaultTable?: string | undefined;
      operator?: string;
      getQuery?: 'getRawMany' | 'getMany';
    } = { getQuery: 'getRawMany', operator: 'like' },
  ) {
    query = this.querySearch(query, filter, q, options);
    const total = await query.getCount();
    if (filter.limit) query.limit(filter.limit);
    if (filter.offset) query.offset(filter.offset);
    const result = await query[options.getQuery]();
    return {
      data: result,
      ...paginate(
        total,
        filter.pageIndex,
        filter.pageSize,
        result.length,
        options.defaultTable,
      ),
    };
  }
}
