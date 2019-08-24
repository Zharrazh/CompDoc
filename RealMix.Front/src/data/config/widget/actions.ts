import { createAction } from 'core/redux';
import { Page } from 'core/page';
import { ActionType } from 'data/actionTypes';

import { WidgetModel, WidgetModelEdit } from './models';

export const setPage = createAction<Page<WidgetModel>>(ActionType.CONFIG_WIDGET_SETPAGE);
export const setItem = createAction<WidgetModelEdit>(ActionType.CONFIG_WIDGET_SETITEM);

export const getPageAsync = createAction<{ page: number; widgetType?: number }>(ActionType.CONFIG_WIDGET_GETPAGEASYNC);
export const getItemAsync = createAction<{ id: number }>(ActionType.CONFIG_WIDGET_GETITEMASYNC);
export const saveAsync = createAction<WidgetModelEdit>(ActionType.CONFIG_WIDGET_SAVEASYNC);
