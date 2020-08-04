import { http } from 'core/http';
import { Page } from 'core/page';

import { PageRequest, Company } from './models';

const baseUrl = 'companies';

export function getPage(model: PageRequest) {
  return http.get<Page<Company>>(baseUrl, model);
}
