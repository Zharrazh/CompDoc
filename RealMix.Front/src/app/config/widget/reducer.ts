import { createReducer } from 'core/reduxHelper';
import { Page } from 'core/page';
import { SyncActions } from 'app/actionTypes';
import { WidgetModel } from './models';

interface WidgetInitialState {
  page?: Page<WidgetModel>;
  item?: WidgetModel;
}

const initialState: () => WidgetInitialState = () => ({});

export const widgetReducer = createReducer(initialState, {
  [SyncActions.CONFIG_WIDGET_SETPAGE]: 'page',
  [SyncActions.CONFIG_WIDGET_SETITEM]: 'item'
});
