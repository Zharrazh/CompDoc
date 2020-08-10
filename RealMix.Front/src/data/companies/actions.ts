import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Page } from 'core/page';
import { Document } from 'data/documents/models';

import { Company, PageRequest, SaveCompanyForm, CompanyFull } from './models';

export const setPage = createAction<Page<Company>>(ActionType.COMMON_COMPANIES_SETPAGE);
export const getPageAsync = createAction<PageRequest>(ActionType.COMMON_COMPANIES_GETPAGEASYNC);
export const saveCompanyAsync = createAction<SaveCompanyForm>(ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC);
export const deleteCompanyOnPage = createAction<number>(ActionType.COMMON_COMPANIES_DELETECOMPANYONPAGE);
export const deleteCompanyAsync = createAction<number>(ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTASYNC);
export const setCompanyFull = createAction<CompanyFull>(ActionType.COMMON_COMPANIES_SETCOMPANYFULL);
export const setAllDocuments = createAction<Document[]>(ActionType.COMMON_COMPANIES_SETALLDOCUMENTS);
export const getAllDocumentsAsync = createAction(ActionType.COMMON_COMPANIES_GETALLDOCUMENTSASYNC);
export const getCompanyFullAsync = createAction<number>(ActionType.COMMON_COMPANIES_GETCOMPANYFULLASYNC);
