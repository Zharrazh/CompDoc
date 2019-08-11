import { of, concat, Observable } from 'rxjs';
import { filter, switchMap, catchError, tap, takeUntil } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';

import { ActionType } from 'app/actionTypes';

import { parseError } from './parseError';
import { AppAction, Dictionary, LoaderData } from './baseTypes';

export function createAction<T>(type: ActionType): (data?: T, mod?: string) => AppAction<T> {
  return (data: any, mod?: string) => ({ type, data, mod });
}

export function createReducer<T extends { [index: string]: any }>(
  initialState: () => T,
  info: Dictionary<string | ((state: T, action: AppAction<any>) => T)>,
  supportReset: boolean = true
) {
  return (state: T = initialState(), action: AppAction<any>): T => {
    if (supportReset && action.type === ActionType.CORE_RESET_STATE) return initialState();
    const actionInfo = info[action.type];
    if (actionInfo == null) return state;
    if (typeof actionInfo === 'function') return actionInfo(state, action);
    const data = action.data === undefined ? initialState()[actionInfo] : action.data;
    if (action.mod != null) return { ...state, [actionInfo]: { ...state[actionInfo], [action.mod]: data } };
    return { ...state, [actionInfo]: data };
  };
}

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
