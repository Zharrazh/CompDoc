import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { AppAction } from 'core/baseTypes';
import { Company } from 'data/companies/models';

import { Document, DocumentFull, DocumentCreatorForm } from './models';

const initState = () => ({
  documentFull: null as DocumentFull | null,
  isDocumentCreatorVisible: false,
  companies: [] as Company[],
  documentCreatorForm: {
    id: -1,
    title: '',
    type: 0,
    body: '',
    companyIds: []
  } as DocumentCreatorForm,
  page: {
    items: [],
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  } as Page<Document>
});
export const documentsReducer = createReducer(initState, {
  [ActionType.COMMON_DOCUMENTS_SETPAGE]: 'page',
  [ActionType.COMMON_DOCUMENTS_SETCOMPANIES]: 'companies',
  [ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTONPAGE]: (state, action: AppAction<number>) => {
    return { ...state, page: { ...state.page, items: state.page.items.filter(i => i.id !== action.data) } };
  },
  [ActionType.COMMON_DOCUMENTS_ADDDOCUMENTONPAGE]: (state, action: AppAction<Document>) => {
    return { ...state, page: { ...state.page, items: [...state.page.items, action.data] } };
  },
  [ActionType.COMMON_DOCUMENTS_SETDOCUMENTFULL]: 'documentFull',
  [ActionType.COMMON_DOCUMENTS_SETCREATORFORM]: 'documentCreatorForm',
  [ActionType.COMMON_DOCUMENTS_SETVISIBLECREATORFORM]: 'isDocumentCreatorVisible',
  [ActionType.COMMON_DOCUMENTS_SETCOMPANIESIDS]: (state, action: AppAction<number[]>) => {
    return { ...state, documentCreatorForm: { ...state.documentCreatorForm, companyIds: [...action.data] } };
  }
});
