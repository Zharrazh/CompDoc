import { ColumnInfo, RowWrapper } from './types';

export const emSize = 14;
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
  for (let i = index, j = 0; i < columns.length && j < span; i++, j++) {
    const column = columns[i];
    if (isVisible(column)) return true;
  }
  return false;
};

export const replaceRow = (oldRows: RowWrapper<any>[], oldRow: RowWrapper<any>, newRow: RowWrapper<any>) => {
  if (oldRow == newRow) return oldRows;
  for (let i = 0; i < oldRows.length; i++) {
    const row = oldRows[i];
    if (row === oldRow) {
      const newRows = [...oldRows];
      newRows[i] = newRow;
      return newRows;
    }
    if (row.items != null && (row.active == null || row.active === true)) {
      const items = replaceRow(row.items, oldRow, newRow);
      if (items != row.items) {
        const newRows = [...oldRows];
        newRows[i] = { ...row, items };
        return newRows;
      }
    }
  }
  return oldRows;
};
