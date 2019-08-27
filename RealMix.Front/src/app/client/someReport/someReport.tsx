import React, { useMemo, useState } from 'react';

import { DefaultPage } from 'shared';

import { data, DataModel } from './data';
import { groupBy } from './utils';
import { ColumnInfo, RowWrapper, TemplateInfo, DataGrid, StaticCell } from './dataGrid';

const columns: ColumnInfo[] = [
  { name: 'id' },
  { name: 'selected' },
  { name: 'name' },
  { name: 'status1' },
  { name: 'status2' },
  { name: 'status3' },
  { name: 'value' },
  { name: 'created' },
  { name: 'updated' }
];

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

  const templates = useMemo(() => {
    const result: {
      [key: string]:
        | TemplateInfo<'head', undefined>
        | TemplateInfo<'group', { name: string }>
        | TemplateInfo<'item', DataModel>;
    } = {
      head: {
        name: 'head',
        classNames: 'head',
        renders: {
          id: () => <StaticCell>Id</StaticCell>,
          selected: () => <StaticCell>Selected</StaticCell>,
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
        onClick: row => setRows(replaceRow(rows, row, { ...row, active: row.active === false })),
        renders: {
          id: model => <StaticCell>{model.item.name}</StaticCell>,
          selected: {
            span: 7,
            render: () => <StaticCell></StaticCell>
          },
          updated: () => <StaticCell>Some Group Data</StaticCell>
        }
      },
      item: {
        name: 'item',
        renders: {
          id: model => <StaticCell>{model.item.id}</StaticCell>,
          selected: () => <StaticCell>noneS</StaticCell>,
          name: model => <StaticCell>{model.item.name}</StaticCell>,
          status1: model => <StaticCell>{model.item.status1 ? 'yes' : 'no'}</StaticCell>,
          status2: model => <StaticCell>{model.item.status2 ? 'yes' : 'no'}</StaticCell>,
          status3: model => <StaticCell>{model.item.status3 ? 'yes' : 'no'}</StaticCell>,
          value: model => <StaticCell>{model.item.number}</StaticCell>,
          created: model => <StaticCell>{model.item.date}</StaticCell>,
          updated: model => <StaticCell>{model.item.date}</StaticCell>
        }
      }
    };
    return result;
  }, [rows]);
  return (
    <DefaultPage title="Some Report">
      <DataGrid lockedColumns={1} lockedRows={1} columns={columns} templates={templates} rows={rows}></DataGrid>
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
