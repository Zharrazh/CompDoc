import { componentFactory } from 'core/componentFactory';
import { Container } from '../';

import './page.scss';

export const PagePanel = componentFactory('pagePanel pt-3');
export const PageHeaderPanel = componentFactory('pageHeaderPanel');
export const PageHeader = componentFactory('pageHeader', 'h3');
export const PageBodyPanel = componentFactory('pageBodyPanel py-3', Container);
