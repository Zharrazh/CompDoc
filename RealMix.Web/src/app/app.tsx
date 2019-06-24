import React, { useEffect, useCallback } from 'react';
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './layout/header';
import { Sidebar } from './layout/sidebar';
import { Container, Row, Block } from 'shared/base';

import { Login } from './common/auth/login';
import { NotFound } from './common/notFound';
import { AdminIndex } from './admin';
import { ClientIndex } from './client';
import { AppDispatch } from 'core/reduxHelper';
import { getAuthInfoAsync } from './common/auth/actions';
import { RepeatPanel } from 'shared';
import { AsyncActions } from './actionTypes';
import { StoreType } from 'core/store';


const RenderLayout: React.FC = () => {
  const authInfo = useSelector((state: StoreType) => state.common.auth.authInfo);
  return !authInfo.isAuth ? null : (
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
  );
}

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const get = useCallback(() => dispatch(getAuthInfoAsync()), [dispatch])
  useEffect(() => { get(); }, [get]);
  return (
    <RepeatPanel actionType={AsyncActions.COMMON_AUTH_GETAUTHINFOASYNC} action={get}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/notFound' component={NotFound} />
        <Route component={RenderLayout} />
      </Switch>
    </RepeatPanel>
  );
}