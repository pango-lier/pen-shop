export interface ISorted {
  id: string;
  desc: boolean;
}
export interface IFiltered {
  id: string;
  value: string | number;
  operator?: string;
}
export interface IPaginate {
  pageIndex?: number;
  pageSize?: number;
  limit?: number;
  offset?: number;
  sorted?: ISorted[] | undefined;
  filtered?: IFiltered[] | undefined;
  q?: number | string | undefined;
}
