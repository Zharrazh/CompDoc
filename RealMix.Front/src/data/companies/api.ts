import { http } from 'core/http';
import { Page } from 'core/page';

import { PageRequest, Company, SaveRequest } from './models';

const baseUrl = 'companies';

export function getPage(model: PageRequest) {
  return http.get<Page<Company>>(baseUrl, model);
}

export function save(model: SaveRequest) {
  return http.post(baseUrl, model);
}
