import React, { useMemo, useState, useCallback, memo, useRef } from 'react';
import classNames from 'classnames';

import { Icon } from 'shared';

import { ColumnInfo, RowWrapper, TemplateInfo } from './types';
import { defaultColumnWidth, defaultRowHeight, getCellWidth, isGroupVisible, isVisible } from './utils';

import './dataGrid.scss';

interface Props<TTemplates extends TemplateInfo<string, any>> {
  lockedColumns: number;
  lockedRows: number;
  columns: ColumnInfo[];
  templates: { [key: string]: TTemplates };
  rows: RowWrapper<any>[];
}

export const DataGrid = <TTemplates extends TemplateInfo<string, any>>({
  lockedColumns,
  lockedRows,
  columns,
  templates,
  rows
}: Props<TTemplates>) => {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const onScroll = useCallback((e: React.SyntheticEvent) => {
    const element = e.target as Element;
    setScroll({ x: element.scrollLeft, y: element.scrollTop });
  }, []);

  const depth = useMemo(() => getDepth(rows, 0), [rows]);

  const [lockedWidth, lockedHeight] = useMemo(
    () => getLockedWidthAndHeight(lockedColumns, lockedRows, columns, templates, rows, depth),
    [lockedColumns, lockedRows, columns, templates, rows, depth]
  );

  const unlockedRef = useRef<HTMLDivElement>(null);

  const wheelCallback = useCallback(
    (e: React.WheelEvent<any>) => {
      if (unlockedRef.current != null) unlockedRef.current.scroll(scroll.x + e.deltaX, scroll.y + e.deltaY);
    },
    [unlockedRef, scroll]
  );

  return (
    <div
      className="dataGrid"
      style={{
        gridTemplateColumns: `${lockedWidth}em calc(100% - ${lockedWidth}em)`,
        gridTemplateRows: `${lockedHeight}em calc(100% - ${lockedHeight}em)`
      }}>
      {lockedColumns !== 0 && lockedRows !== 0 && (
        <div className="lockedXY" onWheel={wheelCallback}>
          <div className="rows-container">
            <RenderRows
              columns={columns}
              templates={templates}
              rows={rows}
              rowStart={0}
              rowCount={lockedRows}
              columnStart={0}
              columnCount={lockedColumns}
              maxDepth={depth}
              currentDepth={0}></RenderRows>
          </div>
        </div>
      )}
      {lockedRows !== 0 && (
        <div className="lockedY" onWheel={wheelCallback}>
          <div className="rows-container" style={{ marginLeft: -scroll.x }}>
            <RenderRows
              columns={columns}
              templates={templates}
              rows={rows}
              rowStart={0}
              rowCount={lockedRows}
              columnStart={lockedColumns}
              columnCount={Number.MAX_VALUE}
              maxDepth={depth}
              currentDepth={0}></RenderRows>
          </div>
        </div>
      )}
      {lockedColumns !== 0 && (
        <div className="lockedX" onWheel={wheelCallback}>
          <div className="rows-container" style={{ marginTop: -scroll.y }}>
            <RenderRows
              columns={columns}
              templates={templates}
              rows={rows}
              rowStart={lockedRows}
              rowCount={Number.MAX_VALUE}
              columnStart={0}
              columnCount={lockedColumns}
              maxDepth={depth}
              currentDepth={0}></RenderRows>
          </div>
        </div>
      )}
      <div className="unlocked" onScroll={onScroll} ref={unlockedRef}>
        <div className="rows-container">
          <RenderRows
            columns={columns}
            templates={templates}
            rows={rows}
            rowStart={lockedRows}
            rowCount={Number.MAX_VALUE}
            columnStart={lockedColumns}
            columnCount={Number.MAX_VALUE}
            maxDepth={depth}
            currentDepth={0}></RenderRows>
        </div>
      </div>
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

const getLockedWidthAndHeight = <TTemplates extends TemplateInfo<string, any>>(
  lockedColumns: number,
  lockedRows: number,
  columns: ColumnInfo[],
  templates: { [key: string]: TTemplates },
  rows: RowWrapper<any>[],
  depth: number
) => {
  let lockedRowsHeight = 0;
  let lockedColumnsWidth = 0;
  for (let i = 0, j = 0; i < rows.length && j < lockedRows; i++, j++) {
    const template = templates[rows[i].template];
    lockedRowsHeight += template != null && template.height != null ? template.height : defaultRowHeight;
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
};

interface RenderRowsProps<TTemplates extends TemplateInfo<string, any>> {
  columns: ColumnInfo[];
  templates: { [key: string]: TTemplates };
  rows: RowWrapper<any>[];
  rowStart: number;
  rowCount: number;
  columnStart: number;
  columnCount: number;
  maxDepth: number;
  currentDepth: number;
}

const RenderRows = memo(
  <TTemplates extends TemplateInfo<string, any>>({
    columns,
    templates,
    rows,
    rowStart,
    rowCount,
    columnStart,
    columnCount,
    maxDepth,
    currentDepth
  }: RenderRowsProps<TTemplates>) => {
    const renderedRows: React.ReactChild[] = [];
    for (let i = rowStart, j = 0; i < rows.length && j < rowCount; i++, j++) {
      const row = rows[i];
      const template = templates[row.template];
      if (template == null) throw new Error("DataGrid: Can't find Row Template");
      renderedRows.push(
        <React.Fragment key={row.key}>
          <RenderRow
            columns={columns}
            template={template}
            row={row}
            columnStart={columnStart}
            columnCount={columnCount}
            maxDepth={maxDepth}
            currentDepth={currentDepth}></RenderRow>
          {row.items != null && (row.active == null || row.active === true) && (
            <RenderRows
              columns={columns}
              templates={templates}
              rows={row.items}
              rowStart={rowStart}
              rowCount={rowCount}
              columnStart={columnStart}
              columnCount={columnCount}
              maxDepth={maxDepth}
              currentDepth={currentDepth + 1}></RenderRows>
          )}
        </React.Fragment>
      );
    }
    return <>{renderedRows}</>;
  }
);

interface RenderRowProps {
  columns: ColumnInfo[];
  template: TemplateInfo<string, any>;
  row: RowWrapper<any>;
  columnStart: number;
  columnCount: number;
  maxDepth: number;
  currentDepth: number;
}

const RenderRow: React.FC<RenderRowProps> = memo(
  ({ columns, template, row, columnStart, columnCount, maxDepth, currentDepth }) => {
    const { renders } = template;
    const height = template.height == null ? defaultRowHeight : template.height;
    const cells = useMemo(() => {
      const renderedCells: React.ReactChild[] = [];
      if (maxDepth > 0 && columnStart === 0) {
        renderedCells.push(
          <GridCell key={-1} width={maxDepth} height={height} className="arrow-icon">
            {row.items != null && (
              <Icon
                name={row.active !== false ? 'angle-down' : 'angle-right'}
                style={{ marginLeft: `${currentDepth * 0.75}em` }}></Icon>
            )}
          </GridCell>
        );
      }
      for (let k = columnStart, l = 0; k < columns.length && l < columnCount; k++, l++) {
        const column = columns[k];
        const cell = renders[column.name];
        if (cell == null) throw new Error("DataGrid: Can't find Cell Render");
        const span = typeof cell === 'function' || cell.span == null ? 1 : cell.span;
        if (span > 1 ? isGroupVisible(columns, k, span) : isVisible(column)) {
          let width = getCellWidth(columns, k, span);
          const renderCellFunction = typeof cell === 'function' ? cell : cell.render;
          renderedCells.push(
            <GridCell key={l} width={width} height={height}>
              {renderCellFunction(row, l)}
            </GridCell>
          );
        }
        k += span - 1;
        l += span - 1;
      }
      return renderedCells;
    }, [renders, height, columns, columnStart, columnCount, currentDepth, maxDepth, row]);

    const clickCallback = useCallback(() => {
      if (template.onClick != null) template.onClick(row);
    }, [template, row]);

    return (
      <div
        className={classNames('dataGrid-row', template.classNames)}
        onClick={clickCallback}
        key={row.key}
        style={{ height: `${height}em` }}>
        {cells}
      </div>
    );
  }
);

interface GridCellProps {
  width: number;
  height: number;
  className?: string;
}

const GridCell: React.FC<GridCellProps> = ({ width, height, className, children }) => (
  <div
    className={classNames('dataGrid-cell', className)}
    key={-1}
    style={{ width: `${width}em`, height: `${height}em` }}>
    {children}
  </div>
);
