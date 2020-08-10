import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { Company } from 'data/companies/models';

import { Document, PageRequest, DocumentFull, DocumentCreatorForm } from './models';

export const setPage = createAction<Page<Document>>(ActionType.COMMON_DOCUMENTS_SETPAGE);
export const getPageAsync = createAction<PageRequest>(ActionType.COMMON_DOCUMENTS_GETPAGEASYNC);
export const saveDocumentAsync = createAction<DocumentCreatorForm>(ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC);
export const deleteDocumentAsync = createAction<number>(ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTASYNC);
export const deleteDocumentOnPage = createAction<number>(ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTONPAGE);
export const setDocumentFull = createAction<DocumentFull>(ActionType.COMMON_DOCUMENTS_SETDOCUMENTFULL);
export const getDocumentFullAsync = createAction<number>(ActionType.COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC);
export const getAllCompaniesAsync = createAction(ActionType.COMMON_DOCUMENTS_GETALLCOMPANIESASYNC);
export const setCompanies = createAction<Company[]>(ActionType.COMMON_DOCUMENTS_SETCOMPANIES);
