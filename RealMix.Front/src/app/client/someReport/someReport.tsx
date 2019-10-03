import React, { useMemo, useState, useCallback } from 'react';

import { DefaultPage } from 'shared';

import { data, DataModel } from './data';
import { groupBy } from './utils';
import {
  ColumnInfo,
  RowWrapper,
  TemplateInfo,
  DataGrid,
  StaticCell,
  CheckboxCell,
  SelectCell,
  InputCell
} from './dataGrid';

export const SomeReport: React.FC = () => {
  const [rows, setRows] = useState(() => {
    const r = groupBy(data, x => x.company).map<RowWrapper<any>>((x, g1Index) => ({
      template: 'group',
      key: g1Index.toString(),
      item: { name: 'Group ' + x.name },
      items: groupBy(x.items, x => x.department).map<RowWrapper<any>>((y, g2Index) => ({
        template: 'group',
        key: '' + g1Index + g2Index,
        item: { name: 'Group ' + y.name },
        items: y.items.map<RowWrapper<any>>((z, i1Index) => ({
          template: 'item',
          key: '' + g1Index + g2Index + i1Index,
          item: z
        }))
      }))
    }));

    r.splice(0, 0, { template: 'head', key: 'head1', item: undefined });
    return r;
  });

  const [columns, setColumns] = useState(() => {
    const result: ColumnInfo[] = [
      { name: 'selected', width: 2 },
      { name: 'id', visible: true },
      { name: 'name', visible: true },
      { name: 'status1' },
      { name: 'status2' },
      { name: 'status3' },
      { name: 'value' },
      { name: 'created' },
      { name: 'updated' }
    ];
    return result;
  });

  const yesnoOptions = useMemo(() => {
    const a = new Map<string, { name: string }>();
    a.set('true', { name: 'YES' });
    a.set('false', { name: 'NO' });
    return a;
  }, []);

  type DataGridItem = DataModel & { selected: boolean };

  const changeRows = useCallback(
    (oldModel: RowWrapper<DataGridItem>, newModel: RowWrapper<DataGridItem>) => {
      setRows(replaceRow(rows, oldModel, newModel));
    },
    [rows]
  );

  const onColumnWidthChangeCallback = useCallback(
    (column: ColumnInfo, width: number) => {
      const newColumns = [...columns];
      const index = newColumns.indexOf(column);
      if (index >= 0) {
        console.log(column, width);
        newColumns[index] = { ...column, width: width };
        setColumns(newColumns);
      }
    },
    [columns]
  );

  const templates = useMemo(() => {
    const result: {
      [key: string]:
        | TemplateInfo<'head', undefined>
        | TemplateInfo<'group', { name: string }>
        | TemplateInfo<'item', DataGridItem>;
    } = {
      head: {
        name: 'head',
        classNames: 'head',
        renders: {
          id: () => <StaticCell>Id</StaticCell>,
          selected: () => <StaticCell></StaticCell>,
          name: () => <StaticCell>Name</StaticCell>,
          status1: {
            span: 3,
            render: () => <StaticCell>Statuses</StaticCell>
          },
          value: () => <StaticCell>Value</StaticCell>,
          created: () => <StaticCell>Created</StaticCell>,
          updated: () => <StaticCell>Updated</StaticCell>
        }
      },
      group: {
        name: 'group',
        classNames: 'group',
        onClick: row => changeRows(row, { ...row, active: row.active === false }),
        renders: {
          selected: {
            span: 8,
            render: model => <StaticCell>{model.item.name}</StaticCell>
          },
          updated: () => <StaticCell>Some Group Data</StaticCell>
        }
      },
      item: {
        name: 'item',
        renders: {
          id: model => <StaticCell>{model.item.id}</StaticCell>,
          selected: model => {
            const onchange = (value: boolean) =>
              changeRows(model, { ...model, item: { ...model.item, selected: value } });
            return <CheckboxCell editMode value={model.item.selected} onChange={onchange}></CheckboxCell>;
          },
          name: model => <StaticCell>{model.item.name}</StaticCell>,
          status1: model => {
            const onchange = (value: string) =>
              changeRows(model, { ...model, item: { ...model.item, status1: value !== 'false' } });
            return (
              <SelectCell
                value={model.item.status1.toString()}
                canChangeMode
                options={yesnoOptions}
                getLabel={x => x.name}
                onChange={onchange}></SelectCell>
            );
          },
          status2: model => {
            const onchange = (value: boolean) =>
              changeRows(model, { ...model, item: { ...model.item, status2: !!value } });
            return <CheckboxCell canChangeMode value={model.item.status2} onChange={onchange}></CheckboxCell>;
          },
          status3: model => <StaticCell>{model.item.status3 ? 'yes' : 'no'}</StaticCell>,
          value: model => {
            const onchange = (value: string) => changeRows(model, { ...model, item: { ...model.item, number: value } });
            return <InputCell value={model.item.number} canChangeMode onChange={onchange}></InputCell>;
          },
          created: model => <StaticCell>{model.item.date}</StaticCell>,
          updated: model => <StaticCell>{model.item.date}</StaticCell>
        }
      }
    };
    return result;
  }, [changeRows, yesnoOptions]);
  return (
    <DefaultPage title="Some Report">
      <DataGrid
        lockedColumns={2}
        lockedRows={1}
        columns={columns}
        templates={templates}
        rows={rows}
        onColumnWidthChange={onColumnWidthChangeCallback}></DataGrid>
    </DefaultPage>
  );
};

const replaceRow = (oldRows: RowWrapper<any>[], oldRow: RowWrapper<any>, newRow: RowWrapper<any>) => {
  if (oldRow == newRow) return oldRows;
  const newRows = [...oldRows];
  for (let i = 0; i < newRows.length; i++) {
    const row = newRows[i];
    if (row === oldRow) {
      newRows[i] = newRow;
      return newRows;
    }
    if (row.items != null && (row.active == null || row.active === true)) {
      const items = replaceRow(row.items, oldRow, newRow);
      if (items != row.items) {
        newRows[i] = { ...row, items };
        return newRows;
      }
    }
  }
  return oldRows;
};
