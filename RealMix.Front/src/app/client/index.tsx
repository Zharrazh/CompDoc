import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useMatch } from 'core/router';

import { DashboardIndex } from './dashboard';
import { SomeReport } from './someReport/someReport';

export const ClientIndex = () => {
  const match = useMatch();
  return (
    <Switch>
      <Route path={`${match.url}someReport`} component={SomeReport} />
      <Route exact path={match.url} component={DashboardIndex} />
      {/* <Redirect to={match.url} /> */}
    </Switch>
  );
};
