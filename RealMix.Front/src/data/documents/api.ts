import { http } from 'core/http';
import { Page } from 'core/page';

import { Document, PageRequest, DocumentFull } from './models';

const baseUrl = 'documents';

export function getPage(model: PageRequest) {
  return http.get<Page<DocumentFull>>(baseUrl, model);
}

export function save(model: Document) {
  return http.post<Document>(baseUrl, model);
}

export function deleteDocument(data: { id: number }) {
  return http.post(`${baseUrl}/${data.id}`, {});
}

export function getDocumentFull(data: { id: number }) {
  return http.get<DocumentFull>(`${baseUrl}/${data.id}`);
}

export function getAllDocuments() {
  return http.get<Document[]>(baseUrl + '/all');
}
