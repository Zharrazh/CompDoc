import React from 'react';
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import { history } from 'core/history';
import { store } from 'core/store';

import { AdminEntryPoint } from 'components/admin';
import { NotFound } from 'components/common/notFound';


export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Redirect exact path="/" to="/app/admin" />
          <Route path='/app/admin' component={AdminEntryPoint} />
          <Route path='/' component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}