import { http } from 'core/http';
import { NotFoundError } from 'core/notFoundError';
import { Page } from 'core/page';
import { DateTime } from 'utils/dateTime';

import { WidgetModel, WidgetModelEdit } from './models';

const baseUrl = 'config/widget';

export async function getPage(page: number) {
  const response = await http.get<Page<WidgetModel>>(baseUrl, { params: { page } });
  response.data.items.forEach(x => {
    x.created = DateTime.parse(x.created as any);
    x.updated = DateTime.parse(x.updated as any);
  });
  return response.data;
}

export async function getItem(id: number) {
  const response = await http.get<WidgetModelEdit>(`${baseUrl}/${id}`);
  if (response.data === null) throw new NotFoundError();
  return response.data;
}

export async function save(model: WidgetModelEdit) {
  await http.post(baseUrl, model);
}
