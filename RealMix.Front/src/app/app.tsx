import React, { useState, useCallback } from 'react';
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';

import { Header } from './layout/header';
import { Sidebar } from './layout/sidebar';
import { Container, Row, Block, Col } from 'shared/base';

import { Login } from './common/auth/login';
import { NotFound } from './common/notFound';
import { AdminIndex } from './admin';
import { ClientIndex } from './client';
import { StoreType } from 'core/store';
import { useHistory } from 'core/routerHooks';

import './app.scss';


const RenderLayout: React.FC = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(s => !s), []);
  const hide = useCallback(() => setShow(false), []);
  const authInfo = useSelector((state: StoreType) => state.common.auth.authInfo);
  if (!authInfo.isAuth) {
    history.push('/login');
    return null;
  }
  return (
    <>
      <Header toggle={toggle}></Header>
      <Sidebar show={show} hide={hide}></Sidebar>
      <Container className="appBody" fluid>
        <Row>
          <Col>
            <Block p="3">
              <Switch>
                <Route path='/admin' component={AdminIndex} />
                <Route path='/' component={ClientIndex} />
              </Switch>
            </Block>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export const App: React.FC = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/notFound' component={NotFound} />
    <Route component={RenderLayout} />
  </Switch>
);