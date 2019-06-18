import { createAction, createAsyncAction } from 'core/reduxHelper';
import { ActionType } from 'app/actionType';
import { getPage, getItem, save } from './api';
import { WidgetModel } from './models';
import { Page } from 'core/page';

export const setPage = createAction<Page<WidgetModel>>(ActionType.ADMIN_WIDGET_SETPAGE);
export const setItem = createAction<WidgetModel>(ActionType.ADMIN_WIDGET_SETITEM);

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
  async ({ dispatch }, model: WidgetModel) => {
    await save(model);
    dispatch(setItem());
  });