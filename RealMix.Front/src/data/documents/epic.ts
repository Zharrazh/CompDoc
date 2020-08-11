import { map, ignoreElements } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import { createEpic } from 'core/epic';
import { ActionType } from 'data/actionTypes';
import { goBackRoute } from 'core/router';
import { getAllCompanies } from 'data/companies/api';

import { getPage, save, deleteDocument, getDocumentFull } from './api';
import { PageRequest, DocumentCreatorForm } from './models';
import { setPage, setDocumentFull, setCompanies } from './actions';

const getPageAsyncEpic = createEpic<PageRequest>(ActionType.COMMON_DOCUMENTS_GETPAGEASYNC, data => {
  return getPage(data).pipe(map(request => setPage(request)));
});

const saveDocumentAsyncEpic = createEpic<DocumentCreatorForm>(ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC, data => {
  return save(data).pipe(map(() => goBackRoute()));
});

const deleteDocumentAsyncEpic = createEpic<number>(ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTASYNC, data => {
  return deleteDocument({ id: data }).pipe(ignoreElements());
});

const getDocumentFullAsyncEpic = createEpic<number>(ActionType.COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC, data => {
  return getDocumentFull({ id: data }).pipe(map(response => setDocumentFull(response)));
});
const getAllCompaniesAsyncEpic = createEpic(ActionType.COMMON_DOCUMENTS_GETALLCOMPANIESASYNC, () => {
  return getAllCompanies().pipe(map(response => setCompanies(response)));
});

export const documentsEpic = combineEpics(
  getPageAsyncEpic,
  saveDocumentAsyncEpic,
  deleteDocumentAsyncEpic,
  getDocumentFullAsyncEpic,
  getAllCompaniesAsyncEpic
);
