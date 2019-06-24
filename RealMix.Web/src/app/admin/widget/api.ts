import { http } from 'core/http';
import { NotFoundError } from 'core/notFoundError';
import { WidgetModel } from './models';
import { Page } from 'core/page';

const baseUrl = 'admin/widget/';

export async function getPage(page: number) {
  const response = await http.get<Page<WidgetModel>>(baseUrl + 'getPage', { params: { page } });
  return response.data;
}

export async function getItem(id: number) {
  const response = await http.get<WidgetModel>(baseUrl + 'getItem', { params: { id } });
  if (response.data === null)
    throw new NotFoundError();
  return response.data;
}

export async function save(model: WidgetModel) {
  await http.post(baseUrl + 'save', model);
}