import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { WidgetIndex } from './widget';
import { Dashboard } from './dashboard/dashboard';

export const ConfigIndex = ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={`${match.url}/widget`} component={WidgetIndex} />
    <Route exact path={match.url} component={Dashboard} />
    <Redirect to={match.url} />
  </Switch>
);
