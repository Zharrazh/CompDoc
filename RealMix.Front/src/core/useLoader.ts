import { useSelector } from 'react-redux';

import { findLoaderItem } from 'core/loader';
import { ActionType } from 'app/actionTypes';
import { StoreType } from 'core/store';

export const useLoader = (actionType: ActionType, mod?: string) => {
  return useSelector((state: StoreType) => findLoaderItem(state.loader, actionType, mod));
};
