import { TableDirection } from '@core/models';

export function anotherDirection(direction: TableDirection): TableDirection {
  return direction === 'asc' ? 'desc' : 'asc';
}
