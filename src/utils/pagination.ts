import { IPaginationOptions } from './types/pagination-options';
import { PaginationResultType } from './types/pagination-result.type';

/**
 * @Deprecated
 */
export const parseToQueryPagination = (
  paginationOptions: IPaginationOptions,
) => {
  return {
    skip: (paginationOptions.page - 1) * paginationOptions.limit,
    take: paginationOptions.limit,
  };
};

/**
 * @Deprecated
 */
export const responseWithPagination = <T>(
  data: [T[], number],
  options: IPaginationOptions,
): PaginationResultType<T> => {
  const [results, totalItems] = data;
  const pageCount = Math.ceil(totalItems / options.limit);

  return {
    results: results,
    currentPage: options.page,
    pageSize: options.limit,
    pageCount: pageCount,
    totalItems: totalItems,
    hasNextPage: data.length === options.limit,
    hasPreviousPage: options.page > 1,
  };
};
