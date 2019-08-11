import { combineEpics } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { createEpic } from 'core/redux';
import { ActionType } from 'app/actionTypes';
import { goBackRoute } from 'core/router';

import { WidgetModelEdit } from './models';
import { setPage, setItem } from './actions';
import { getPage, getItem, save } from './api';

const getPageAsyncEpic = createEpic(ActionType.CONFIG_WIDGET_GETPAGEASYNC, (data: { page: number }) =>
  getPage(data.page).pipe(map(response => setPage(response)))
);

const getItemAsyncEpic = createEpic(ActionType.CONFIG_WIDGET_GETITEMASYNC, (data: { id: number }) =>
  getItem(data.id).pipe(map(response => setItem(response)))
);

const saveAsyncEpic = createEpic(ActionType.CONFIG_WIDGET_SAVEASYNC, (data: WidgetModelEdit) =>
  save(data).pipe(mergeMap(() => of(setItem(), goBackRoute())))
);

export const widgetEpic = combineEpics(getPageAsyncEpic, getItemAsyncEpic, saveAsyncEpic);
