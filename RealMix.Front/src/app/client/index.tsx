import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { DashboardIndex } from './dashboard';
import { SomeReport } from './someReport/someReport';

export const ClientIndex = ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={`${match.url}/someReport`} component={SomeReport} />
    <Route exact path={match.url} component={DashboardIndex} />
    <Redirect to={match.url} />
  </Switch>
);