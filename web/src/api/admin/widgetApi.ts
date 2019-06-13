import { http } from 'core/http';
import { NotFoundError } from 'core/notFoundError';
import { Widget } from 'models/widget';
import { Page } from 'core/page';

const baseUrl = 'admin/widget/';

export async function getPage(page: number) {
  const response = await http.get<Page<Widget>>(baseUrl + 'getPage', { params: { page } });
  return response.data;
}

export async function getItem(id: number) {
  const response = await http.get<Widget>(baseUrl + 'getItem', { params: { id } });
  if (response.data === null)
    throw new NotFoundError();
  return response.data;
}

export async function save(model: Widget) {
  await http.post(baseUrl + 'save', model);
}