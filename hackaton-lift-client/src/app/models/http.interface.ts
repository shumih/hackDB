export interface Response<T> {
  data: T[];
  total_count: number;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}
