import { createCrudIndex } from 'core/createCrudIndex';

import { WidgetList } from './widgetList';
import { WidgetItem } from './widgetItem';

export const WidgetIndex = createCrudIndex(WidgetItem, WidgetList);
