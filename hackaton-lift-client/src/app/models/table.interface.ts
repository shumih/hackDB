export interface SortRule<F extends string> {
  order_field: F;
  order_direction: TableDirection;
}

export type TableDirection = 'asc' | 'desc';
