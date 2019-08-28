import React, { useMemo, useState } from 'react';

import { DefaultPage } from 'shared';

import { data, DataModel } from './data';
import { groupBy } from './utils';
import {
  ColumnInfo,
  RowWrapper,
  TemplateInfo,
  DataGrid,
  StaticCell,
  Renders,
  CheckboxCell,
  SelectCell
} from './dataGrid';

const columns: ColumnInfo[] = [
  { name: 'selected', width: 2 },
  { name: 'id' },
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

  const headRenders: Renders<undefined> = useMemo(
    () => ({
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
    }),
    []
  );
  const groupRenders: Renders<{ name: string }> = useMemo(
    () => ({
      id: model => <StaticCell>{model.item.name}</StaticCell>,
      selected: () => <StaticCell></StaticCell>,
      name: {
        span: 6,
        render: () => <StaticCell></StaticCell>
      },
      updated: () => <StaticCell>Some Group Data</StaticCell>
    }),
    []
  );
  const yesnoOptions = useMemo(() => {
    const a = new Map<string, { name: string }>();
    a.set('true', { name: 'YES' });
    a.set('false', { name: 'NO' });
    return a;
  }, []);
  const itemRenders: Renders<DataModel & { selected: boolean }> = useMemo(
    () => ({
      id: model => <StaticCell>{model.item.id}</StaticCell>,
      selected: model => {
        const onchange = (value: boolean) =>
          setRows(replaceRow(rows, model, { ...model, item: { ...model.item, selected: value } }));
        return <CheckboxCell editMode value={model.item.selected} onChange={onchange}></CheckboxCell>;
      },
      name: model => <StaticCell>{model.item.name}</StaticCell>,
      status1: model => {
        const onchange = (value: string) =>
          setRows(replaceRow(rows, model, { ...model, item: { ...model.item, status1: value } }));
        return (
          <SelectCell
            value={model.item.status1.toString()}
            canChangeMode
            options={yesnoOptions}
            getLabel={x => x.name}
            onChange={onchange}></SelectCell>
        );
      },
      status2: model => <StaticCell>{model.item.status2 ? 'yes' : 'no'}</StaticCell>,
      status3: model => <StaticCell>{model.item.status3 ? 'yes' : 'no'}</StaticCell>,
      value: model => <StaticCell>{model.item.number}</StaticCell>,
      created: model => <StaticCell>{model.item.date}</StaticCell>,
      updated: model => <StaticCell>{model.item.date}</StaticCell>
    }),
    [setRows, rows, yesnoOptions]
  );
  const templates = useMemo(() => {
    const result: {
      [key: string]:
        | TemplateInfo<'head', undefined>
        | TemplateInfo<'group', { name: string }>
        | TemplateInfo<'item', DataModel & { selected: boolean }>;
    } = {
      head: {
        name: 'head',
        classNames: 'head',
        renders: headRenders
      },
      group: {
        name: 'group',
        classNames: 'group',
        onClick: row => setRows(replaceRow(rows, row, { ...row, active: row.active === false })),
        renders: groupRenders
      },
      item: {
        name: 'item',
        renders: itemRenders
      }
    };
    return result;
  }, [rows, headRenders, groupRenders, itemRenders]);
  return (
    <DefaultPage title="Some Report">
      <DataGrid lockedColumns={2} lockedRows={1} columns={columns} templates={templates} rows={rows}></DataGrid>
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
