import { map } from 'rxjs/operators';

import { http } from 'core/http';
import { NotFoundError } from 'core/notFoundError';
import { Page } from 'core/page';
import { DateTime } from 'utils/dateTime';

import { WidgetModel, WidgetModelEdit } from './models';

const baseUrl = 'config/widget';

export function getPage(page: number) {
  return http.get<Page<WidgetModel>>(baseUrl, { page }).pipe(
    map(x => {
      x.items.forEach(x => {
        x.created = DateTime.parse(x.created as any);
        x.updated = DateTime.parse(x.updated as any);
      });
      return x;
    })
  );
}

export function getItem(id: number) {
  const response = http.get<WidgetModelEdit>(`${baseUrl}/${id}`);
  if (response === null) throw new NotFoundError();
  return response;
}

export function save(model: WidgetModelEdit) {
  return http.post(baseUrl, model);
}
