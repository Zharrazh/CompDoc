import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { WidgetEntryPoint } from './widget';
import { Dashboard } from './dashboard/dashboard';
import { Sidebar } from './sidebar/sidebar';

export const AdminEntryPoint = ({ match }: RouteComponentProps) => (
  <>
    <Sidebar></Sidebar>
    <Switch>
      <Route path={`${match.url}/widget`} component={WidgetEntryPoint} />
      <Route path={match.url} component={Dashboard} />
    </Switch>
  </>
);