import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useMatch } from 'core/router';

import { WidgetIndex } from './widget';
import { Dashboard } from './dashboard/dashboard';

export const ConfigIndex: React.FC = () => {
  const match = useMatch();
  return (
    <Switch>
      <Route path={`${match.url}/widget`} component={WidgetIndex} />
      <Route exact path={match.url} component={Dashboard} />
      <Redirect to={match.url} />
    </Switch>
  );
};
