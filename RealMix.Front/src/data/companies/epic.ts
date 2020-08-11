import { map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import { createEpic } from 'core/epic';
import { ActionType } from 'data/actionTypes';
import { getPage, save, deleteCompany, getCompanyFull } from 'data/companies/api';
import { getAllDocuments } from 'data/documents/api';
import { goBackRoute } from 'core/router';

import { PageRequest, SaveCompanyForm } from './models';
import { setPage, deleteCompanyOnPage, setAllDocuments, setCompanyFull } from './actions';

const getPageAsyncEpic = createEpic<PageRequest>(ActionType.COMMON_COMPANIES_GETPAGEASYNC, data => {
  return getPage(data).pipe(map(response => setPage(response)));
});

const saveCompanyAsyncEpic = createEpic<SaveCompanyForm>(ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC, data => {
  return save(data).pipe(map(() => goBackRoute()));
});

const deleteCompanyAsyncEpic = createEpic<number>(ActionType.COMMON_COMPANIES_DELETECOMPANYASYNC, data => {
  return deleteCompany({ id: data }).pipe(map(() => deleteCompanyOnPage(data)));
});

const getAllDocumentsAsyncEpic = createEpic(ActionType.COMMON_COMPANIES_GETALLDOCUMENTSASYNC, () => {
  return getAllDocuments().pipe(map(response => setAllDocuments(response)));
});

const getCompanyFullAsyncEpic = createEpic<number>(ActionType.COMMON_COMPANIES_GETCOMPANYFULLASYNC, data => {
  return getCompanyFull({ id: data }).pipe(map(response => setCompanyFull(response)));
});

export const companiesEpic = combineEpics(
  getPageAsyncEpic,
  saveCompanyAsyncEpic,
  deleteCompanyAsyncEpic,
  getAllDocumentsAsyncEpic,
  getCompanyFullAsyncEpic
);
