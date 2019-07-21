import { WidgetList } from './widgetList';
import { WidgetItem } from './widgetItem';
import { createCrudIndex } from 'core/createCrudIndex';

export const WidgetIndex = createCrudIndex(WidgetItem, WidgetList);
