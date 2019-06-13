import { createAction, createAsyncAction } from 'core/reduxHelper';
import { ActionType } from 'actions/actionType';
import { getPage, getItem, save } from 'api/admin/widgetApi';
import { Widget } from 'models/widget';
import { Page } from 'core/page';

export const setPage = createAction<Page<Widget>>(ActionType.ADMIN_WIDGET_SETPAGE);
export const setItem = createAction<Widget>(ActionType.ADMIN_WIDGET_SETITEM);

export const getPageAsync = createAsyncAction(ActionType.ADMIN_WIDGET_GETPAGEASYNC,
  async ({ dispatch, isLast }, { page }: { page: number }) => {
    const result = await getPage(page);
    isLast();
    dispatch(setPage(result));
  });

export const getItemAsync = createAsyncAction(ActionType.ADMIN_WIDGET_GETITEMASYNC,
  async ({ dispatch, isLast }, { id }: { id: number }) => {
    const item = await getItem(id);
    isLast();
    dispatch(setItem(item));
  });

export const saveAsync = createAsyncAction(ActionType.ADMIN_WIDGET_SAVEASYNC,
  async ({ dispatch }, model: Widget) => {
    await save(model);
    dispatch(setItem());
  });