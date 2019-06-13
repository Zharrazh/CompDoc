import { createReducer } from 'core/reduxHelper';
import { Page } from 'core/page';
import { ActionType } from 'actions/actionType';
import { Widget } from 'models/widget';

const initialState = {} as {
  page: Page<Widget>;
  item: Widget;
};

export const widget = createReducer(initialState, {
  [ActionType.ADMIN_WIDGET_SETPAGE]: "page",
  [ActionType.ADMIN_WIDGET_SETITEM]: "item"
});