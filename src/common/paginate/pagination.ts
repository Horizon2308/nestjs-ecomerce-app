interface PaginationResult<T> {
  limit: number;
  count: number;
  data: T[];
}
export class Pagination<T> {
  total_page: number;

  total_count: number;

  item_count: number;

  data: T[];

  constructor(paginationResults: PaginationResult<T>) {
    this.total_page = Math.ceil(
      paginationResults.count / paginationResults.limit,
    );
    this.total_count = paginationResults.count;
    this.item_count = paginationResults.data.length;
    this.data = paginationResults.data;
  }
}
