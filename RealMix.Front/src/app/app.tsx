import React, { useState, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from './layout/header';
import { Sidebar } from './layout/sidebar';
import { Block } from 'shared';

import { Login } from './common/auth/login';
import { NotFound } from './common/notFound';
import { StoreType } from 'core/store';
import { useHistory } from 'core/routerHooks';
import { asyncComponentFactory } from 'core/asyncComponentFactory';

import './app.scss';

const ConfigIndexAsync = asyncComponentFactory(() => import('./config'));
const ClientIndexAsync = asyncComponentFactory(() => import('./client'));

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
      <Block className="appBody" p="3">
        <Switch>
          <Route path="/config" component={ConfigIndexAsync} />
          <Route path="/" component={ClientIndexAsync} />
        </Switch>
      </Block>
    </>
  );
};

export const App: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/notFound" component={NotFound} />
    <Route component={RenderLayout} />
  </Switch>
);
