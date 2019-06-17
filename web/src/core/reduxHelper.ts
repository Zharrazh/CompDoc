import { ActionType } from "actions/actionType";
import { history } from './history';
import { counter } from "./counter";
import { parseError } from "./parseError";
import { NotFoundError } from "./notFoundError";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreType } from "./store";
import { Action } from "redux";

interface ReducerDefinition<T extends BaseInitialState> {
  [index: string]: string | ((state: T, action: ActionDefinition<any>) => T);
};

interface ActionDefinition<T> {
  type: ActionType;
  data: T;
  mod?: string;
}

interface BaseInitialState {
  [index: string]: any;
};

interface LoaderData {
  id: ActionType;
  number: number;
  mod?: string;
  isOk: boolean;
  isWait: boolean;
  isError: boolean;
  error?: string | string[];

  [actionType: string]: any;
}

interface LoaderState extends BaseInitialState {
  [actionType: string]: LoaderData | { [mod: string]: LoaderData };
}

type ActionBody<T> = (funcs: { dispatch: Function, isLast: () => void, getState: Function }, data: T) => Promise<any>;

class ActionCancelledError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ActionCancelledError.name;
  }
}

const ok = (id: ActionType, number: number, mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({ id, number, mod, isOk: true, isWait: false, isError: false });

const wait = (id: ActionType, number: number, mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({ id, number, mod, isOk: false, isWait: true, isError: false });

const error = (id: ActionType, number: number, error: string | string[], mod?: string) =>
  createAction<LoaderData>(ActionType.CORE_LOADER)({ id, number, mod, isOk: false, isWait: false, isError: true, error });

export function createReducer<T extends BaseInitialState>(initialState: T, info: ReducerDefinition<T>, supportReset: boolean = true) {
  return (state: T = initialState, action: ActionDefinition<any>): T => {
    if (supportReset && action.type === ActionType.CORE_RESET_STATE)
      return initialState;
    const actionInfo = info[action.type];
    if (actionInfo == null)
      return state;
    if (typeof actionInfo === "function")
      return actionInfo(state, action);
    const data = action.data === undefined ? initialState[actionInfo] : action.data;
    if (action.mod != null)
      return { ...state, [actionInfo]: { ...state[actionInfo], [action.mod]: data } }
    return { ...state, [actionInfo]: data };
  }
}

export function createAction<T>(type: ActionType): (data?: T, mod?: string) => ActionDefinition<T> {
  return (data: any, mod?: string) => ({ type, data, mod });
}

export function findLoaderItem(loaderState: LoaderState, type: ActionType, mod?: string): LoaderData {
  if (mod != null) {
    const stateForType = loaderState[type];
    return stateForType != null ? stateForType[mod] : undefined;
  }
  return loaderState[type] as LoaderData;
}
export type AppDispatch = ThunkDispatch<StoreType, null, Action<string>>;
export type AppAction = ThunkAction<Promise<LoaderData>, StoreType, null, Action<string>>;

export function createAsyncAction<T>(type: ActionType, actionBody: ActionBody<T>, mod?: string) {
  return (parameters: T): AppAction => async (dispatch, getState) => {
    const number = counter.next;
    const isLast = () => {
      const item = findLoaderItem(getState().loader, type, mod);
      if (!item || number >= item.number)
        return;
      throw new ActionCancelledError();
    };
    try {
      dispatch(wait(type, number, mod));
      await actionBody({ dispatch, isLast, getState }, parameters);
      dispatch(ok(type, number, mod));
    } catch (exc) {
      if (exc instanceof ActionCancelledError) { }
      else {
        if (exc instanceof NotFoundError)
          history.push('/app/notfound');
        dispatch(error(type, number, parseError(exc), mod));
      }
    }
    return findLoaderItem(getState().loader, type, mod);
  };
}

export const loaderReducer = createReducer<LoaderState>({}, {
  [ActionType.CORE_LOADER]: (state, action: ActionDefinition<LoaderData>) => {
    const item = findLoaderItem(state, action.data.id, action.data.mod);
    if (item && item.number > action.data.number)
      return state;
    if (action.data.mod != null)
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          [action.data.mod]: action.data
        }
      };
    return {
      ...state,
      [action.data.id]: action.data
    };
  }
});
