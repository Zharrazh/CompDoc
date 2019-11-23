import { ActionType } from 'data/actionTypes';

import { AppAction, Dictionary } from './baseTypes';

export function createAction<T>(
  type: ActionType
): (data?: T, mod?: string, callBack?: (error?: any) => void) => AppAction<T> {
  return (data: any, mod?: string, callBack?: (error?: any) => void) => ({ type, data, mod, callBack });
}

export function createReducer<T extends { [index: string]: any }>(
  initialState: () => T,
  info: Dictionary<string | ((state: T, action: AppAction<any>) => T)>,
  supportReset = true
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
