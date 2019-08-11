import { Page } from 'core/page';
import { ActionType } from 'app/actionTypes';
import { WidgetType } from 'enums/WidgetType';
import { createReducer } from 'core/redux';

import { WidgetModel, WidgetModelEdit } from './models';

interface WidgetState {
  page?: Page<WidgetModel>;
  item: WidgetModelEdit;
}

const initialState: () => WidgetState = () => ({
  item: {
    id: 0,
    name: '',
    parameters: '',
    type: WidgetType.Text
  }
});

export const widgetReducer = createReducer(initialState, {
  [ActionType.CONFIG_WIDGET_SETPAGE]: 'page',
  [ActionType.CONFIG_WIDGET_SETITEM]: 'item'
});
