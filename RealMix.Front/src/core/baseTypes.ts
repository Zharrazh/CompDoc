import { Action } from 'redux';

import { ActionType } from 'data/actionTypes';

export interface AppAction<T> extends Action<ActionType> {
  data: T;
  mod?: string;
}

export interface Dictionary<V> {
  [key: string]: V;
}
