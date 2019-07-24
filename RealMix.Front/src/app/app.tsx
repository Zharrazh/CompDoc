import React, { useState, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Block } from 'shared';
import { StoreType } from 'core/store';
import { useHistory } from 'core/routerHooks';
import { asyncComponent } from 'core/asyncComponent';

import { Header } from './layout/header';
import { Sidebar } from './layout/sidebar';
import { Login } from './common/auth/login';
import { NotFound } from './common/notFound';

import './app.scss';

const ConfigIndexAsync: React.FC = asyncComponent(() => import('./config').then(x => x.ConfigIndex));
const ClientIndexAsync: React.FC = asyncComponent(() => import('./client').then(x => x.ClientIndex));

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
