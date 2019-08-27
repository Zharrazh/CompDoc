import { ColumnInfo } from './types';

export const defaultRowHeight = 2.25;
export const defaultColumnWidth = 10;

export const getCellWidth = (columns: ColumnInfo[], index: number, span: number) => {
  let width = 0;
  for (let i = index, j = 0; i < columns.length && j < span; i++, j++) {
    const column = columns[i];
    if (isVisible(column)) {
      const currentWidth = column.width == null ? defaultColumnWidth : column.width;
      width += currentWidth;
    }
  }
  return width;
};

export const isVisible = ({ visible }: { visible?: boolean }) => visible == null || visible === true;

export const isGroupVisible = (columns: ColumnInfo[], index: number, span: number) => {
  for (let i = index, j = 0; i < columns.length && j < span; i++) {
    const column = columns[i];
    if (isVisible(column)) return true;
  }
  return false;
};
