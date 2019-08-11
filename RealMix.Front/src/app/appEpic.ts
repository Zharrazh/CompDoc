import { combineEpics, ActionsObservable } from 'redux-observable';
import { filter, map } from 'rxjs/operators';

import { AppAction } from 'core/baseTypes';
import { history } from 'core/history';

import { configEpic } from './config/configEpic';
import { commonEpic } from './common/commonEpic';
import { ActionType } from './actionTypes';

const routerPush = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_PUSH),
    map(x => {
      history.push(x.data);
      return { type: '' };
    })
  );

const routerGoBack = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_GOBACK),
    map(() => {
      history.goBack();
      return { type: '' };
    })
  );

export const appEpic = combineEpics(routerPush, routerGoBack, configEpic, commonEpic);
