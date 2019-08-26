import React from 'react';

import { DefaultPage } from 'shared';

import { data, DataModel } from './data';
import { groupBy } from './utils';
import { ColumnInfo, TemplateInfo, RowWrapper, GridFrame } from './gridFrame';

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

const templates: {
  [key: string]:
    | TemplateInfo<'head', undefined>
    | TemplateInfo<'group', { name: string }>
    | TemplateInfo<'item', DataModel>;
} = {
  head: {
    name: 'head',
    renders: {
      id: () => <div>Id</div>,
      selected: () => <div>Selected</div>,
      name: () => <div>Name</div>,
      status1: {
        span: 3,
        render: () => <div>Statuses</div>
      },
      value: () => <div>Value</div>,
      created: () => <div>Created</div>,
      updated: () => <div>Updated</div>
    }
  },
  group: {
    name: 'group',
    renders: {
      id: model => <div>{model.item.name}</div>,
      selected: {
        span: 7,
        render: () => <div></div>
      },
      updated: () => <div>Some Group Data</div>
    }
  },
  item: {
    name: 'item',
    renders: {
      id: model => <div>{model.item.id}</div>,
      selected: () => <div>noneS</div>,
      name: model => <div>{model.item.name}</div>,
      status1: model => <div>{model.item.status1 ? 'yes' : 'no'}</div>,
      status2: model => <div>{model.item.status2 ? 'yes' : 'no'}</div>,
      status3: model => <div>{model.item.status3 ? 'yes' : 'no'}</div>,
      value: model => <div>{model.item.number}</div>,
      created: model => <div>{model.item.date}</div>,
      updated: model => <div>{model.item.date}</div>
    }
  }
};

const rows = groupBy(data, x => x.company).map<RowWrapper<any>>((x, g1Index) => ({
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

rows.splice(0, 0, { template: 'head', key: 'head1', item: undefined });

export const SomeReport: React.FC = () => (
  <DefaultPage title="Some Report">
    <GridFrame lockedColumns={1} lockedRows={1} columns={columns} templates={templates} value={rows}></GridFrame>
  </DefaultPage>
);
