import { createAction, createAsyncAction } from 'core/reduxHelper';
import { Page } from 'core/page';
import { AsyncActions, SyncActions } from 'app/actionTypes';

import { getPage, getItem, save } from './api';
import { WidgetModel } from './models';

export const setPage = createAction<Page<WidgetModel>>(SyncActions.CONFIG_WIDGET_SETPAGE);
export const setItem = createAction<WidgetModel>(SyncActions.CONFIG_WIDGET_SETITEM);

export const getPageAsync = createAsyncAction(
  AsyncActions.CONFIG_WIDGET_GETPAGEASYNC,
  async ({ dispatch, isLast }, { page }: { page: number }) => {
    const result = await getPage(page);
    isLast();
    dispatch(setPage(result));
  }
);

export const getItemAsync = createAsyncAction(
  AsyncActions.CONFIG_WIDGET_GETITEMASYNC,
  async ({ dispatch, isLast }, { id }: { id: number }) => {
    const item = await getItem(id);
    isLast();
    dispatch(setItem(item));
  }
);

export const saveAsync = createAsyncAction(
  AsyncActions.CONFIG_WIDGET_SAVEASYNC,
  async ({ dispatch }, model: WidgetModel) => {
    await save(model);
    dispatch(setItem());
  }
);
