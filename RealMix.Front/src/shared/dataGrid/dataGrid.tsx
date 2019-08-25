import React, { useState } from 'react';
import classNames from 'classnames';

import { componentFactory } from 'core/componentFactory';

import './dataGrid.scss';
import { StaticCell } from './staticCell';

interface DataGridColumn<T> {
  label: React.ReactChild;
  render: (model: T) => React.ReactNode;
  visible?: () => boolean;
}

export interface DataGridModel<T> {
  columns: DataGridColumn<T>[];
}

interface Props<T> {
  model: DataGridModel<T>;
  items: T[];
  selected?: T;
  onRowSelect?: (model: T) => void;
}

export const DataGrid = <T extends object>({ items, model, onRowSelect, selected }: Props<T>) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const onScroll = (e: React.SyntheticEvent) => {
    setScrollLeft((e.target as Element).scrollLeft);
  };
  return (
    <div className="dataGrid">
      <DataGridHeader>
        <DataGridRow style={{ marginLeft: `-${scrollLeft}px` }}>
          {model.columns.map((column, index) => renderHeader(index, column))}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody onScroll={onScroll}>
        {items.map((item, index) => renderRow(index, item, model.columns, selected, onRowSelect))}
      </DataGridBody>
    </div>
  );
};

const DataGridHeader = componentFactory('dataGrid-header');
const DataGridRow = componentFactory('dataGrid-row');
const DataGridBody = componentFactory('dataGrid-body');
const DataGridCell = componentFactory('dataGrid-cell');

const renderHeader = <T extends object>(index: number, column: DataGridColumn<T>) => {
  if (column.visible && !column.visible()) return null;
  return (
    <DataGridCell key={index}>
      <StaticCell value={column.label}></StaticCell>
    </DataGridCell>
  );
};

const renderRow = <T extends object>(
  index: number,
  item: T,
  columns: DataGridColumn<T>[],
  selected?: T,
  onRowSelect?: (model: T) => void
) => {
  return (
    <DataGridRow
      className={classNames({ active: selected === item })}
      onClick={() => (onRowSelect != null ? onRowSelect(item) : undefined)}
      key={index}>
      {columns.map((column, index) => renderCell(index, item, column))}
    </DataGridRow>
  );
};

const renderCell = <T extends object>(index: number, item: T, column: DataGridColumn<T>) => {
  if (column.visible && !column.visible()) return null;
  return <DataGridCell key={index}>{column.render(item)}</DataGridCell>;
};
