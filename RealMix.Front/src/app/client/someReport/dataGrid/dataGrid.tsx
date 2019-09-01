import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { Icon } from 'shared';

import { ColumnInfo, RowWrapper, TemplateInfo } from './types';
import { emSize, defaultColumnWidth, defaultRowHeight, getCellWidth, isGroupVisible, isVisible } from './utils';

import './dataGrid.scss';

interface Props<TTemplates extends TemplateInfo<string, any>> {
  lockedColumns: number;
  lockedRows: number;
  columns: ColumnInfo[];
  templates: { [key: string]: TTemplates };
  rows: RowWrapper<any>[];
  onColumnWidthChange?: (column: ColumnInfo, width: number) => void;
}

interface RowInfo {
  top: number;
  bottom: number;
  height: number;
  depth: number;
  template: TemplateInfo<string, any>;
  row: RowWrapper<any>;
}

interface ScrollInfo {
  x: number;
  y: number;
  height: number;
}

export const DataGrid = <TTemplates extends TemplateInfo<string, any>>({
  lockedColumns,
  lockedRows,
  columns,
  templates,
  rows,
  onColumnWidthChange
}: Props<TTemplates>) => {
  const [scroll, setScroll] = useState<ScrollInfo>({ x: 0, y: 0, height: 1000 });

  const onScroll = useCallback((event: React.SyntheticEvent) => {
    const e = event.target as Element;
    setScroll({ x: e.scrollLeft, y: e.scrollTop, height: e.clientHeight });
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

  const resizeCallback = useCallback(() => {
    if (unlockedRef.current != null) setScroll({ ...scroll, height: unlockedRef.current.clientHeight });
  }, [scroll, unlockedRef]);

  useEffect(() => {
    window.addEventListener('resize', resizeCallback);
    return () => window.removeEventListener('resize', resizeCallback);
  }, [resizeCallback]);

  const listOfRows = useMemo(() => {
    const result: RowInfo[] = [];
    fillRows(result, templates, rows, 0, { height: 0 });
    return result;
  }, [rows, templates]);

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
              rows={listOfRows}
              maxDepth={depth}
              rowStart={0}
              rowCount={lockedRows}
              columnStart={0}
              columnCount={lockedColumns}
              onColumnWidthChange={onColumnWidthChange}></RenderRows>
          </div>
        </div>
      )}
      {lockedRows !== 0 && (
        <div className="lockedY" onWheel={wheelCallback}>
          <div className="rows-container" style={{ marginLeft: -scroll.x }}>
            <RenderRows
              columns={columns}
              rows={listOfRows}
              maxDepth={depth}
              rowStart={0}
              rowCount={lockedRows}
              columnStart={lockedColumns}
              columnCount={columns.length}
              onColumnWidthChange={onColumnWidthChange}></RenderRows>
          </div>
        </div>
      )}
      {lockedColumns !== 0 && (
        <div className="lockedX" onWheel={wheelCallback}>
          <div className="rows-container" style={{ marginTop: -scroll.y }}>
            <RenderRows
              columns={columns}
              rows={listOfRows}
              maxDepth={depth}
              rowStart={lockedRows}
              rowCount={listOfRows.length - lockedRows}
              columnStart={0}
              columnCount={lockedColumns}
              scroll={scroll}
              onColumnWidthChange={onColumnWidthChange}></RenderRows>
          </div>
        </div>
      )}
      <div className="unlocked" onScroll={onScroll} ref={unlockedRef}>
        <div className="rows-container">
          <RenderRows
            columns={columns}
            rows={listOfRows}
            maxDepth={depth}
            rowStart={lockedRows}
            rowCount={listOfRows.length - lockedRows}
            columnStart={lockedColumns}
            columnCount={columns.length}
            scroll={scroll}
            onColumnWidthChange={onColumnWidthChange}></RenderRows>
        </div>
      </div>
    </div>
  );
};

const fillRows = <TTemplates extends TemplateInfo<string, any>>(
  listOfRows: RowInfo[],
  templates: { [key: string]: TTemplates },
  rows: RowWrapper<any>[],
  depth: number,
  heightRef: { height: number }
) => {
  rows.forEach(row => {
    const template = templates[row.template];
    if (template == null) throw new Error(`DataGrid: Can't find Row Template for '${row.template}'`);
    const height = template.height == null ? defaultRowHeight : template.height;
    listOfRows.push({
      height,
      top: heightRef.height * emSize,
      bottom: (heightRef.height + height) * emSize,
      depth,
      row,
      template
    });
    heightRef.height += height;
    if (Array.isArray(row.items) && row.items.length > 0 && row.active !== false)
      fillRows(listOfRows, templates, row.items, depth + 1, heightRef);
  });
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
  for (let i = 0, j = 0; i < columns.length && j < lockedColumns; i++, j++) {
    const column = columns[i];
    if (isVisible(column))
      lockedColumnsWidth += column != null && column.width != null ? column.width : defaultColumnWidth;
  }
  lockedColumnsWidth += depth;
  return [lockedColumnsWidth, lockedRowsHeight];
};

interface RenderRowsProps {
  columns: ColumnInfo[];
  rows: RowInfo[];
  rowStart: number;
  rowCount: number;
  columnStart: number;
  columnCount: number;
  maxDepth: number;
  scroll?: ScrollInfo;
  onColumnWidthChange?: (column: ColumnInfo, width: number) => void;
}

const RenderRows: React.FC<RenderRowsProps> = ({
  columns,
  rows,
  rowStart,
  rowCount,
  columnStart,
  columnCount,
  maxDepth,
  scroll,
  onColumnWidthChange
}) => {
  const renderedRows: React.ReactChild[] = [];
  let beforeRender = 0;
  let afterRender = 0;
  let firstRender = false;
  let lastRender = false;
  for (let i = rowStart, j = 0; i < rows.length && j < rowCount; i++, j++) {
    const row = rows[i];
    const shouldRender =
      scroll == null || (row.bottom >= scroll.y && row.top - 2 * row.height * emSize <= scroll.y + scroll.height);

    if (!firstRender && shouldRender) firstRender = true;
    if (firstRender && !lastRender && !shouldRender) lastRender = true;

    if (!firstRender) beforeRender += row.height;
    if (lastRender) afterRender += row.height;

    if (shouldRender)
      renderedRows.push(
        <RenderRow
          key={row.row.key}
          columns={columns}
          rowInfo={row}
          columnStart={columnStart}
          columnCount={columnCount}
          maxDepth={maxDepth}
          onColumnWidthChange={onColumnWidthChange}></RenderRow>
      );
  }
  return (
    <>
      <div style={{ height: beforeRender + 'em', width: '100%', flexShrink: 0, flexGrow: 0 }}></div>
      {renderedRows}
      <div style={{ height: afterRender + 'em', width: '100%', flexShrink: 0, flexGrow: 0 }}></div>
    </>
  );
};

interface RenderRowProps {
  columns: ColumnInfo[];
  rowInfo: RowInfo;
  columnStart: number;
  columnCount: number;
  maxDepth: number;
  onColumnWidthChange?: (column: ColumnInfo, width: number) => void;
}

const RenderRow: React.FC<RenderRowProps> = ({
  columns,
  rowInfo,
  columnStart,
  columnCount,
  maxDepth,
  onColumnWidthChange
}) => {
  const { renders } = rowInfo.template;
  const cells = useMemo(() => {
    const renderedCells: React.ReactChild[] = [];
    if (maxDepth > 0 && columnStart === 0) {
      renderedCells.push(
        <GridCell key={-1} width={maxDepth} height={rowInfo.height} className="arrow-icon">
          {rowInfo.row.items != null && (
            <Icon
              name={rowInfo.row.active !== false ? 'angle-down' : 'angle-right'}
              style={{ marginLeft: `${rowInfo.depth * 0.75}em` }}></Icon>
          )}
        </GridCell>
      );
    }
    for (let k = 0, l = 0; k < columns.length && l < columnCount; k++, l++) {
      const column = columns[k];
      let cell = renders[column.name];
      if (cell == null)
        throw new Error(`DataGrid: Can't find Cell Render for '${rowInfo.template.name}/${column.name}'`);
      if (typeof cell === 'function') cell = { render: cell };
      const renderAt = cell.renderAt == null ? 'start' : cell.renderAt;
      let span = cell.span == null ? 1 : cell.span;
      if (k + span > columnStart) {
        let shouldRenderContent = true;
        if (k < columnStart) {
          shouldRenderContent = renderAt === 'end' || !isGroupVisible(columns, k, columnStart - k);
          span = k + span - columnStart;
          k = columnStart;
        }
        if (k + span > columnStart + columnCount) {
          shouldRenderContent =
            renderAt === 'start' ||
            !isGroupVisible(columns, columnStart + columnCount, k + span - columnStart - columnCount);
          span = columnStart + columnCount - k;
        }
        if (span > 1 ? isGroupVisible(columns, k, span) : isVisible(column)) {
          let width = getCellWidth(columns, k, span);
          renderedCells.push(
            <GridCell key={l} width={width} height={rowInfo.height}>
              {shouldRenderContent ? cell.render(rowInfo.row, l) : undefined}
              {rowInfo.template.name === 'head' && onColumnWidthChange != null && (
                <GridCellResizer column={columns[k + span - 1]} onChange={onColumnWidthChange}></GridCellResizer>
              )}
            </GridCell>
          );
        }
      }
      k += span - 1;
      l += span - 1;
    }
    return renderedCells;
  }, [renders, columns, columnStart, columnCount, maxDepth, rowInfo, onColumnWidthChange]);

  const clickCallback = useCallback(() => {
    if (rowInfo.template.onClick != null) rowInfo.template.onClick(rowInfo.row);
  }, [rowInfo]);

  return (
    <div
      className={classNames('dataGrid-row', rowInfo.template.classNames)}
      onClick={clickCallback}
      style={{ height: `${rowInfo.height}em` }}>
      {cells}
    </div>
  );
};

interface GridCellProps {
  width: number;
  height: number;
  className?: string;
}

const GridCell: React.FC<GridCellProps> = ({ width, height, className, children }) => (
  <div className={classNames('dataGrid-cell', className)} style={{ width: `${width}em`, height: `${height}em` }}>
    {children}
  </div>
);

interface GridCellResizerProps {
  column: ColumnInfo;
  onChange: (column: ColumnInfo, width: number) => void;
}

const GridCellResizer: React.FC<GridCellResizerProps> = ({ column, onChange }) => {
  const [start, setStart] = useState<{ point: number; width: number } | null>(null);

  const mouseDownCallback = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setStart({ point: e.clientX, width: column.width == null ? defaultColumnWidth : column.width });
    },
    [column]
  );

  const onMouseMoveRx = useMemo(() => new Subject<number>(), []);

  useEffect(() => {
    const s = onMouseMoveRx.pipe(throttleTime(100)).subscribe(clientX => {
      if (start != null) {
        const change = clientX - start.point;
        const width = start.width * emSize + change < 2 * emSize ? 2 : start.width + change / emSize;
        onChange(column, width);
      }
    });
    return () => s.unsubscribe();
  }, [start, column, onChange, onMouseMoveRx]);

  const mouseUpCallback = useCallback(
    (e: Event) => {
      if (start != null) {
        e.stopPropagation();
        e.preventDefault();
        setStart(null);
      }
    },
    [start]
  );

  const mouseMoveCallback = useCallback((e: MouseEvent) => onMouseMoveRx.next(e.clientX), [onMouseMoveRx]);

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveCallback);
    return () => document.removeEventListener('mousemove', mouseMoveCallback);
  }, [mouseMoveCallback]);

  useEffect(() => {
    document.addEventListener('mouseup', mouseUpCallback);
    return () => document.removeEventListener('mouseup', mouseUpCallback);
  }, [mouseUpCallback]);

  return <div className={classNames('resizer', { active: start != null })} onMouseDown={mouseDownCallback}></div>;
};
