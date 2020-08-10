import { http } from 'core/http';
import { Page } from 'core/page';

import { PageRequest, CompanyFull, SaveCompanyForm, Company } from './models';

const baseUrl = 'companies';

export function getPage(model: PageRequest) {
  return http.get<Page<CompanyFull>>(baseUrl, model);
}

export function save(model: SaveCompanyForm) {
  return http.post(baseUrl, model);
}

export function deleteCompany(data: { id: number }) {
  return http.post(`${baseUrl}/${data.id}`, {});
}

export function getAllCompanies() {
  return http.get<Company[]>(baseUrl + '/all');
}

export function getCompanyFull(data: { id: number }) {
  return http.get<CompanyFull>(`${baseUrl}/${data.id}`);
}
