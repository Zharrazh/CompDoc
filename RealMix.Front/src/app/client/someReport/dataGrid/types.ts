import React from 'react';

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
  renderAt?: 'start' | 'end';
  render: RenderMethod<TModel>;
}

interface Renders<TModel> {
  [key: string]: RenderInfo<TModel> | RenderMethod<TModel>;
}

export interface TemplateInfo<TName, TModel> {
  name: TName;
  onClick?: (e: RowWrapper<any>) => void;
  classNames?: string;
  height?: number;
  renders: Renders<TModel>;
}

export interface RowWrapper<TModel> {
  key: string | number;
  template: string;
  item: TModel;
  items?: RowWrapper<any>[];
  active?: boolean;
}
