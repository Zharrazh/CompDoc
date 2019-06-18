import { createReducer } from 'core/reduxHelper';
import { Page } from 'core/page';
import { ActionType } from 'app/actionType';
import { WidgetModel } from './models';

interface WidgetInitialState {
  page?: Page<WidgetModel>;
  item?: WidgetModel;
}

const initialState: WidgetInitialState = {};

export const widgetReducer = createReducer(initialState, {
  [ActionType.ADMIN_WIDGET_SETPAGE]: "page",
  [ActionType.ADMIN_WIDGET_SETITEM]: "item"
});