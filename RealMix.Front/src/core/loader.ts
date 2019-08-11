import { ActionType } from 'app/actionTypes';

import { LoaderData, AppAction } from './baseTypes';
import { createReducer } from './redux';

interface LoaderSubState {
  [mod: string]: LoaderData;
}

interface LoaderState {
  [actionType: string]: LoaderData | LoaderSubState;
}

export function findLoaderItem(loaderState: LoaderState, type: ActionType, mod?: string): LoaderData | undefined {
  if (mod != null) {
    const stateForType = loaderState[type];
    return stateForType != null ? (stateForType as LoaderSubState)[mod] : undefined;
  }
  return loaderState[type] as LoaderData;
}

export const loaderReducer = createReducer<LoaderState>(() => ({}), {
  [ActionType.CORE_LOADER]: (state, action: AppAction<LoaderData>) => {
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
