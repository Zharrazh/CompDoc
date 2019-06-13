import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { WidgetList } from './widgetList';
import { WidgetItem } from './widgetItem';

export const WidgetEntryPoint = ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={`${match.url}/:id`} component={WidgetItem} />
    <Route path={`${match.url}/add`} component={WidgetItem} />
    <Route path={match.url} component={WidgetList} />
  </Switch>
);