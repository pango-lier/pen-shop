import { SortOrder } from '../../dto/generic-conditions.dto';
import { PaginationArgs } from '../../dto/pagination-args.dto';

export interface IMapPaginate extends PaginationArgs {
  orderBy?: string;
  sortedBy?: SortOrder | string;
  search?: string;
  parent?: number | string;
  language?: string;
  searchJoin?: string;
}
