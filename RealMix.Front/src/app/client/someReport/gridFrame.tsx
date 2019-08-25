import React, { useMemo } from 'react';

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
  renders: {
    [key: string]: RenderInfo<TModel> | RenderMethod<TModel>;
  };
}

export interface RowWrapper<TModel> {
  template: string;
  visible?: boolean;
  item: TModel;
  items?: RowWrapper<any>[];
}

interface Props<TTemplates extends TemplateInfo<string, any>> {
  lockedColumns: number;
  lockedRows: number;
  columns: ColumnInfo[];
  templates: {
    [key: string]: TTemplates;
  };
  value: RowWrapper<any>[];
}

const defaultRowHeight = 2.25;
const defaultColumnWidth = 10;

export const GridFrame = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows, columns, templates, value } = props;
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
    return [lockedColumnsWidth, lockedRowsHeight];
  }, [lockedColumns, lockedRows, columns, templates, value]);
  return (
    <div
      className="gridFrame"
      style={{ gridTemplateColumns: `${lockedWidth}em auto`, gridTemplateRows: `${lockedHeight}em auto` }}>
      {renderLockedXY(props)}
      {renderLockedY(props)}
      {renderLockedX(props)}
      {renderUnlocked(props)}
    </div>
  );
};

const renderLockedXY = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows } = props;

  if (lockedColumns === 0 || lockedRows === 0) return undefined;

  return (
    <div className="lockedXY">
      <div className="rows-container">{renderRows(props, 0, lockedRows, 0, lockedColumns)}</div>
    </div>
  );
};

const renderLockedY = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows } = props;

  if (lockedRows === 0) return undefined;

  return (
    <div className="lockedY">
      <div className="rows-container">{renderRows(props, 0, lockedRows, lockedColumns, Number.MAX_VALUE)}</div>
    </div>
  );
};

const renderLockedX = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows } = props;

  if (lockedColumns === 0) return undefined;

  return (
    <div className="lockedX">
      <div className="rows-container">{renderRows(props, lockedRows, Number.MAX_VALUE, 0, lockedColumns)}</div>
    </div>
  );
};

const renderUnlocked = <TTemplates extends TemplateInfo<string, any>>(props: Props<TTemplates>) => {
  const { lockedColumns, lockedRows } = props;

  return (
    <div className="unlocked">
      <div className="rows-container">
        {renderRows(props, lockedRows, Number.MAX_VALUE, lockedColumns, Number.MAX_VALUE)}
      </div>
    </div>
  );
};

interface ColumnRenderInfo {
  row: RowWrapper<any>;
  width: number;
  height: number;
  index: number;
  render: RenderMethod<any>;
}

const renderRows = <TTemplates extends TemplateInfo<string, any>>(
  { columns, templates, value }: Props<TTemplates>,
  rowStart: number,
  rowCount: number,
  columnStart: number,
  columnCount: number
) => {
  const renderedRows: ColumnRenderInfo[][] = [];

  for (let i = rowStart, j = 0; i < value.length && j < rowCount; i++, j++) {
    const row = value[i];
    if (isVisible(row)) {
      const template = templates[row.template];
      if (template == null) throw new Error("GridFrame: Can't find Row Template");
      const height = template.height == null ? defaultRowHeight : template.height;
      const renderedColumns: ColumnRenderInfo[] = [];
      for (let k = columnStart, l = 0; k < columns.length && l < columnCount; k++, l++) {
        const column = columns[k];
        const cell = template.renders[column.name];
        if (cell == null) throw new Error("GridFrame: Can't find Cell Render");
        const span = typeof cell === 'function' || cell.span == null ? 1 : cell.span;
        if (span > 1 ? isGroupVisible(columns, k, span) : isVisible(column)) {
          let width = getCellWidth(columns, k, span);
          const renderCellFunction = typeof cell === 'function' ? cell : cell.render;
          renderedColumns.push({ row, width, height, index: i, render: renderCellFunction });
        }
        k += span - 1;
        l += span - 1;
      }
      renderedRows.push(renderedColumns);
    }
  }
  console.log(renderedRows);
  return (
    <>
      {renderedRows.map((row, i) => (
        <div className="gridFrame-row" key={i}>
          {row.map((column, j) => (
            <div
              className="gridFrame-column"
              key={j}
              style={{ width: `${column.width}em`, height: `${column.height}em` }}>
              <div>{column.render(column.row, column.index)}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

const getCellWidth = (columns: ColumnInfo[], index: number, span: number) => {
  let width = 0;
  for (let i = index, j = 0; i < columns.length && j < span; i++) {
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
