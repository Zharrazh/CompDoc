import { map, mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';

import { createEpic } from 'core/epic';
import { ActionType } from 'data/actionTypes';

import { getPage, save, deleteDocument, getDocumentFull, getAllCompanies } from './api';
import { PageRequest, DocumentCreatorForm } from './models';
import {
  setPage,
  deleteDocumentOnPage,
  addDocumentOnPage,
  setDocumentFull,
  setCompanies,
  setVisibleCreaterForm,
  setCreatorForm,
  setCompaniesIds
} from './actions';

const getPageAsyncEpic = createEpic<PageRequest>(ActionType.COMMON_DOCUMENTS_GETPAGEASYNC, data => {
  return getPage(data).pipe(map(request => setPage(request)));
});

const saveDocumentAsyncEpic = createEpic<DocumentCreatorForm>(ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC, data => {
  return save(data).pipe(mergeMap(response => of(addDocumentOnPage(response), setVisibleCreaterForm(false))));
});

const deleteDocumentAsyncEpic = createEpic<number>(ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTASYNC, data => {
  return deleteDocument({ id: data }).pipe(map(() => deleteDocumentOnPage(data)));
});

const getDocumentFullAsyncEpic = createEpic<number>(ActionType.COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC, data => {
  return getDocumentFull({ id: data }).pipe(map(response => setDocumentFull(response)));
});
const getAllCompaniesAsyncEpic = createEpic(ActionType.COMMON_DOCUMENTS_GETALLCOMPANIESASYNC, () => {
  return getAllCompanies().pipe(map(response => setCompanies(response)));
});

const setCreatorFormByIdEpic = createEpic<number>(ActionType.COMMON_DOCUMENTS_SETCREATORFORMBYID, data => {
  return getDocumentFull({ id: data }).pipe(
    mergeMap(response =>
      of(
        setCreatorForm({ ...response, companyIds: [] }),
        setCompaniesIds(response.companies.map(c => c.id)),
        setVisibleCreaterForm(true)
      )
    )
  );
});
export const documentsEpic = combineEpics(
  getPageAsyncEpic,
  saveDocumentAsyncEpic,
  deleteDocumentAsyncEpic,
  getDocumentFullAsyncEpic,
  getAllCompaniesAsyncEpic,
  setCreatorFormByIdEpic
);
