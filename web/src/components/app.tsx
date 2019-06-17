import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import { history } from 'core/history';
import { store } from 'core/store';

import { Header } from 'components/common/header';
import { Sidebar } from 'components/common/sidebar';
import { Container, Row, Block } from 'components/shared/base';

import { Login } from 'components/login/login';
import { NotFound } from 'components/common/notFound';
import { AdminIndex } from 'components/admin';
import { ClientIndex } from 'components/client';


const RenderLayout: React.FC = () => (
  <>
    <Header></Header>
    <Container className="appBody" fluid>
      <Row>
        <Sidebar></Sidebar>
        <Block>
          <Switch>
            <Route path='/admin' component={AdminIndex} />
            <Route component={ClientIndex} />
          </Switch>
        </Block>
      </Row>
    </Container>
  </>
)

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/notFound' component={NotFound} />
          <Route component={RenderLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}