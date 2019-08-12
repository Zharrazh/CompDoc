import { of, concat, Observable } from 'rxjs';
import { filter, switchMap, catchError, tap, takeUntil, map } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';

import { ActionType } from 'data/actionTypes';

import { history } from './history';
import { parseError } from './parseError';
import { AppAction, LoaderData } from './baseTypes';
import { createAction } from './redux';

export const createEpic = <TIn>(type: ActionType, handler: (data: TIn) => Observable<AppAction<any>>, mod?: string) => (
  action$: ActionsObservable<AppAction<any>>
) =>
  action$.pipe(
    filter(x => x.type === type && x.mod === mod),
    tap(x => console.info('IN', x.type, x.mod, x.data)),
    switchMap(x =>
      concat(
        of(wait(type, mod)),
        handler(x.data).pipe(
          takeUntil(
            action$.pipe(
              filter(y => y.type === ActionType.CORE_CANCELLATION && y.data === type && y.mod === mod),
              tap(x => console.info('CANCELLATION', x.type, x.mod, x.data))
            )
          )
        ),
        of(ok(type, mod))
      ).pipe(catchError(e => of(error(type, parseError(e), mod))))
    ),
    tap(x => console.info('OUT', x.type, x.mod, x.data))
  );

export const routerPush = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_PUSH),
    map(x => {
      history.push(x.data);
      return { type: '' };
    })
  );

export const routerGoBack = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_GOBACK),
    map(() => {
      history.goBack();
      return { type: '' };
    })
  );

const ok = (id: any, mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({ id, mod, isOk: true, isWait: false, isError: false });

const wait = (id: any, mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({ id, mod, isOk: false, isWait: true, isError: false });

const error = (id: any, error: string | string[], mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({
    id,
    mod,
    isOk: false,
    isWait: false,
    isError: true,
    error
  });
