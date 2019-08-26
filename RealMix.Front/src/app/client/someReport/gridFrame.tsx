import React, { useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';

import { Icon } from 'shared';

import './gridFrame.scss';

export interface ColumnInfo {
  name: string;
  width?: number;
  visible?: boolean;
}

interface RenderMethod<TModel> {
  (model: RowWrapper<TModel>, index: number): React.ReactChild;
}

interface RenderInfo<TModel> {
  span?: number;
  render: RenderMethod<TModel>;
}

export interface TemplateInfo<TName, TModel> {
  name: TName;
  height?: number;
  renders: { [key: string]: RenderInfo<TModel> | RenderMethod<TModel> };
}

export interface RowWrapper<TModel> {
  key: string | number;
  template: string;
  visible?: boolean;
  item: TModel;
  items?: RowWrapper<any>[];
}

interface Props<TTemplates extends TemplateInfo<string, any>> {
  lockedColumns: number;
  lockedRows: number;
  columns: ColumnInfo[];
  templates: { [key: string]: TTemplates };
  value: RowWrapper<any>[];
}

const defaultRowHeight = 2.25;
const defaultColumnWidth = 10;

export const GridFrame = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows, columns, templates, value } = props;
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const onScroll = useCallback((e: React.SyntheticEvent) => {
    const element = e.target as Element;
    setScroll({ x: element.scrollLeft, y: element.scrollTop });
  }, []);
  const depth = useMemo(() => getDepth(value, 0), [value]);
  const [lockedWidth, lockedHeight] = useMemo(() => {
    let lockedRowsHeight = 0;
    let lockedColumnsWidth = 0;
    for (let i = 0, j = 0; i < value.length && j < lockedRows; i++) {
      const row = value[i];
      if (isVisible(row)) {
        j++;
        const template = templates[row.template];
        lockedRowsHeight += template != null && template.height != null ? template.height : defaultRowHeight;
      }
    }
    for (let i = 0, j = 0; i < columns.length && j < lockedColumns; i++) {
      const column = columns[i];
      if (isVisible(column)) {
        j++;
        lockedColumnsWidth += column != null && column.width != null ? column.width : defaultColumnWidth;
      }
    }
    lockedColumnsWidth += depth;
    return [lockedColumnsWidth, lockedRowsHeight];
  }, [lockedColumns, lockedRows, columns, templates, value, depth]);
  return (
    <div
      className="gridFrame"
      style={{
        gridTemplateColumns: `${lockedWidth}em calc(100% - ${lockedWidth}em)`,
        gridTemplateRows: `${lockedHeight}em calc(100% - ${lockedHeight}em)`
      }}>
      {renderLockedXY(props, depth)}
      {renderLockedY(props, depth, scroll.x)}
      {renderLockedX(props, depth, scroll.y)}
      {renderUnlocked(props, depth, onScroll)}
    </div>
  );
};

const getDepth = (rows: RowWrapper<any>[], depth: number) => {
  let result = depth;
  for (let row of rows) {
    if (row.items != null) {
      const subtreeDepth = getDepth(row.items, depth + 1);
      result = Math.max(result, subtreeDepth);
    }
  }
  return result;
};

const renderLockedXY = <TTemplates extends TemplateInfo<string, any>>(
  { lockedColumns, lockedRows, columns, templates, value }: Props<TTemplates>,
  depth: number
) => {
  if (lockedColumns === 0 || lockedRows === 0) return undefined;

  return (
    <div className="lockedXY">
      <div className="rows-container">
        <RenderRows
          columns={columns}
          templates={templates}
          value={value}
          rowStart={0}
          rowCount={lockedRows}
          columnStart={0}
          columnCount={lockedColumns}
          depth={depth}></RenderRows>
      </div>
    </div>
  );
};

const renderLockedY = <TTemplates extends TemplateInfo<string, any>>(
  { lockedColumns, lockedRows, columns, templates, value }: Props<TTemplates>,
  depth: number,
  shift: number
) => {
  if (lockedRows === 0) return undefined;

  return (
    <div className="lockedY">
      <div className="rows-container" style={{ marginLeft: -shift }}>
        <RenderRows
          columns={columns}
          templates={templates}
          value={value}
          rowStart={0}
          rowCount={lockedRows}
          columnStart={lockedColumns}
          columnCount={Number.MAX_VALUE}
          depth={depth}></RenderRows>
      </div>
    </div>
  );
};

const renderLockedX = <TTemplates extends TemplateInfo<string, any>>(
  { lockedColumns, lockedRows, columns, templates, value }: Props<TTemplates>,
  depth: number,
  shift: number
) => {
  if (lockedColumns === 0) return undefined;

  return (
    <div className="lockedX">
      <div className="rows-container" style={{ marginTop: -shift }}>
        <RenderRows
          columns={columns}
          templates={templates}
          value={value}
          rowStart={lockedRows}
          rowCount={Number.MAX_VALUE}
          columnStart={0}
          columnCount={lockedColumns}
          depth={depth}></RenderRows>
      </div>
    </div>
  );
};

const renderUnlocked = <TTemplates extends TemplateInfo<string, any>>(
  { lockedColumns, lockedRows, columns, templates, value }: Props<TTemplates>,
  depth: number,
  onScroll: (e: React.SyntheticEvent) => void
) => {
  return (
    <div className="unlocked" onScroll={onScroll}>
      <div className="rows-container">
        <RenderRows
          columns={columns}
          templates={templates}
          value={value}
          rowStart={lockedRows}
          rowCount={Number.MAX_VALUE}
          columnStart={lockedColumns}
          columnCount={Number.MAX_VALUE}
          depth={depth}></RenderRows>
      </div>
    </div>
  );
};

interface RenderRowsProps<TTemplates extends TemplateInfo<string, any>> {
  columns: ColumnInfo[];
  templates: { [key: string]: TTemplates };
  value: RowWrapper<any>[];
  rowStart: number;
  rowCount: number;
  columnStart: number;
  columnCount: number;
  depth: number;
}
const RenderRows = <TTemplates extends TemplateInfo<string, any>>({
  columns,
  templates,
  value,
  rowStart,
  rowCount,
  columnStart,
  columnCount,
  depth
}: RenderRowsProps<TTemplates>) => {
  const result = useMemo(
    () => renderRows(columns, templates, value, rowStart, rowCount, columnStart, columnCount, depth, 0),
    [columns, templates, value, rowStart, rowCount, columnStart, columnCount, depth]
  );
  return <>{result}</>;
};

const renderRows = <TTemplates extends TemplateInfo<string, any>>(
  columns: ColumnInfo[],
  templates: { [key: string]: TTemplates },
  value: RowWrapper<any>[],
  rowStart: number,
  rowCount: number,
  columnStart: number,
  columnCount: number,
  maxDepth: number,
  currentDepth: number
) => {
  const renderedRows: React.ReactChild[] = [];

  for (let i = rowStart, j = 0; i < value.length && j < rowCount; i++, j++) {
    const row = value[i];
    if (isVisible(row)) {
      const template = templates[row.template];
      if (template == null) throw new Error("GridFrame: Can't find Row Template");
      const height = template.height == null ? defaultRowHeight : template.height;
      const renderedColumns: React.ReactChild[] = [];
      if (maxDepth > 0 && columnStart === 0) {
        renderedColumns.push(
          <GridColumn key={-1} width={maxDepth} height={height} className="arrow-icon">
            {row.items != null && <Icon name="angle-down" style={{ marginLeft: `${currentDepth / 2}em` }}></Icon>}
          </GridColumn>
        );
      }
      for (let k = columnStart, l = 0; k < columns.length && l < columnCount; k++, l++) {
        const column = columns[k];
        const cell = template.renders[column.name];
        if (cell == null) throw new Error("GridFrame: Can't find Cell Render");
        const span = typeof cell === 'function' || cell.span == null ? 1 : cell.span;
        if (span > 1 ? isGroupVisible(columns, k, span) : isVisible(column)) {
          let width = getCellWidth(columns, k, span);
          const renderCellFunction = typeof cell === 'function' ? cell : cell.render;
          renderedColumns.push(
            <GridColumn key={l} width={width} height={height}>
              {renderCellFunction(row, l)}
            </GridColumn>
          );
        }
        k += span - 1;
        l += span - 1;
      }
      renderedRows.push(
        <div className="gridFrame-row" key={row.key} style={{ height: `${height}em` }}>
          {renderedColumns}
        </div>
      );
      if (row.items != null) {
        const subrows = renderRows(
          columns,
          templates,
          row.items,
          0,
          Number.MAX_VALUE,
          columnStart,
          columnCount,
          maxDepth,
          currentDepth + 1
        );
        renderedRows.push(...subrows);
      }
    }
  }
  return renderedRows;
};

interface GridColumnProps {
  width: number;
  height: number;
  className?: string;
}
const GridColumn: React.FC<GridColumnProps> = ({ width, height, className, children }) => (
  <div
    className={classNames('gridFrame-column', className)}
    key={-1}
    style={{ width: `${width}em`, height: `${height}em` }}>
    {children}
  </div>
);

const getCellWidth = (columns: ColumnInfo[], index: number, span: number) => {
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

const isVisible = ({ visible }: { visible?: boolean }) => visible == null || visible === true;

const isGroupVisible = (columns: ColumnInfo[], index: number, span: number) => {
  for (let i = index, j = 0; i < columns.length && j < span; i++) {
    const column = columns[i];
    if (isVisible(column)) return true;
  }
  return false;
};
