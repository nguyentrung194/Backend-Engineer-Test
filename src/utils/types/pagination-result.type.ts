export type PaginationResultType<T> = Readonly<{
  results: T[];
  currentPage: number;
  pageSize: number;
  pageCount: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}>;
