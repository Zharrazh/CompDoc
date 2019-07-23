import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';

import { Dashboard } from './dashboard';

export const DashboardIndex = ({ match }: RouteComponentProps) => (
  <Switch>
    <Route exact path={match.url} component={Dashboard} />
    <Redirect to={match.url} />
  </Switch>
);
