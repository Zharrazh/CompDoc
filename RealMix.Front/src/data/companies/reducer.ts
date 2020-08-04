import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { AppAction } from 'core/baseTypes';

import { Company } from './models';

const initState = () => ({
  page: {
    items: [],
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  } as Page<Company>
});
export const companiesReducer = createReducer(initState, {
  [ActionType.COMMON_COMPANIES_SETPAGE]: (state, action: AppAction<Page<Company>>) => ({ ...state, page: action.data })
});
