import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from '../../common/dto/pagination-args.dto';

export class GetAttributesArgs {
  orderBy?: QueryAttributesOrderByOrderByClause[];
  shop_id?: number;
  language?: string;
}

export class QueryAttributesOrderByOrderByClause {
  column: QueryAttributesOrderByColumn;
  order: SortOrder;
}
export enum QueryAttributesOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
export class GetProductsDto extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  searchJoin?: string;
  search?: string;
  date_range?: string;
  language?: string;
}
