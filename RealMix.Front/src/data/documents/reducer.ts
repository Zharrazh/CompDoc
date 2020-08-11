import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { AppAction } from 'core/baseTypes';
import { Company } from 'data/companies/models';

import { DocumentFull } from './models';

type DocumentsState = {
  documentFull?: DocumentFull;
  companies: Company[];
  page: Page<DocumentFull>;
};
const initState: () => DocumentsState = () => ({
  companies: [],
  page: {
    items: [],
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  }
});
export const documentsReducer = createReducer(initState, {
  [ActionType.COMMON_DOCUMENTS_SETPAGE]: 'page',
  [ActionType.COMMON_DOCUMENTS_SETCOMPANIES]: 'companies',
  [ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTONPAGE]: (state, action: AppAction<number>) => {
    return { ...state, page: { ...state.page, items: state.page.items.filter(i => i.id !== action.data) } };
  },
  [ActionType.COMMON_DOCUMENTS_SETDOCUMENTFULL]: 'documentFull'
});
