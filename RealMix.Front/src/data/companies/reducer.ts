import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { AppAction } from 'core/baseTypes';
import { Document } from 'data/documents/models';

import { CompanyFull } from './models';

const initState = () => ({
  companyFull: null as CompanyFull | null,
  documents: [] as Document[],
  page: {
    items: [],
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  } as Page<CompanyFull>
});
export const companiesReducer = createReducer(initState, {
  [ActionType.COMMON_COMPANIES_SETPAGE]: (state, action: AppAction<Page<CompanyFull>>) => ({
    ...state,
    page: action.data
  }),
  [ActionType.COMMON_COMPANIES_DELETECOMPANYONPAGE]: (state, action: AppAction<number>) => {
    return { ...state, page: { ...state.page, items: state.page.items.filter(i => i.id !== action.data) } };
  },
  [ActionType.COMMON_COMPANIES_SETCOMPANYFULL]: 'companyFull',
  [ActionType.COMMON_COMPANIES_SETALLDOCUMENTS]: 'documents'
});
