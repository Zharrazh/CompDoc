import { of, concat, Observable } from 'rxjs';
import { filter, switchMap, catchError, tap, takeUntil, map, groupBy, mergeMap } from 'rxjs/operators';
import { ActionsObservable, StateObservable } from 'redux-observable';

import { ActionType } from 'data/actionTypes';

import { history } from './history';
import { parseError } from './parseError';
import { AppAction } from './baseTypes';
import { error, wait, ok } from './loader';
import { StoreType } from './store';

export const createEpic = <TIn>(
  type: ActionType,
  handler: (data: TIn, mod: string | undefined, state$: StateObservable<StoreType>) => Observable<AppAction<any>>
) => (action$: ActionsObservable<AppAction<any>>, state$: StateObservable<StoreType>) =>
  action$.pipe(
    filter(x => x.type === type),
    //tap(x => console.info('IN', x.type, x.mod, x.data)),
    groupBy(x => x.mod),
    mergeMap(x =>
      x.pipe(
        switchMap(x =>
          concat(
            of(wait(type, x.mod)),
            handler(x.data, x.mod, state$).pipe(
              tap(
                () => {},
                error => {
                  if (x.callBack != null) x.callBack(error);
                },
                () => {
                  if (x.callBack != null) x.callBack();
                }
              ),
              takeUntil(
                action$.pipe(
                  filter(y => y.type === ActionType.CORE_CANCELLATION && y.data === type && y.mod === x.mod)
                  //, tap(x => console.info('CANCELLATION', x.type, x.mod, x.data))
                )
              )
            ),
            of(ok(type, x.mod))
          ).pipe(catchError(e => of(error(type, parseError(e), x.mod))))
        )
      )
    )
    //, tap(x => console.info('OUT', x.type, x.mod, x.data))
  );

export const routerPush = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_PUSH),
    map(x => {
      history.push(x.data);
      return { type: ActionType.CORE_NOPE };
    })
  );

export const routerGoBack = (action$: ActionsObservable<AppAction<any>>) =>
  action$.pipe(
    filter(x => x.type === ActionType.CORE_ROUTER_GOBACK),
    map(() => {
      history.goBack();
      return { type: ActionType.CORE_NOPE };
    })
  );
