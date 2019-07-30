import { createReducer } from 'core/reduxHelper';
import { Page } from 'core/page';
import { SyncActions } from 'app/actionTypes';
import { WidgetType } from 'enums/WidgetType';

import { WidgetModel, WidgetModelEdit } from './models';

interface WidgetInitialState {
  page?: Page<WidgetModel>;
  item: WidgetModelEdit;
}

const initialState: () => WidgetInitialState = () => ({
  item: {
    id: 0,
    name: '',
    parameters: '',
    type: WidgetType.Text
  }
});

export const widgetReducer = createReducer(initialState, {
  [SyncActions.CONFIG_WIDGET_SETPAGE]: 'page',
  [SyncActions.CONFIG_WIDGET_SETITEM]: 'item'
});
