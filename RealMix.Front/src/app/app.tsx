import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// import { asyncComponent } from 'core/asyncComponent';
// import { Header } from './layout/header';
// import { Sidebar } from './layout/sidebar';
// import { Login } from './common/login';
// import { NotFound } from './common/notFound';
// import { Block } from 'shared';
// import { StoreType } from 'core/store';
// import { pushRoute } from 'core/router';

import './app.scss';
import { Companies } from './compainesDocuments/companies';
import { Documents } from './compainesDocuments/documents';

// const ConfigIndexAsync: React.FC = asyncComponent(() => import('./config').then(x => x.ConfigIndex));
// const ClientIndexAsync: React.FC = asyncComponent(() => import('./client').then(x => x.ClientIndex));

/*const RenderLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(s => !s), []);
  const hide = useCallback(() => setShow(false), []);
  const authInfo = useSelector((state: StoreType) => state.auth.authInfo);
  if (!authInfo.isAuth) {
    dispatch(pushRoute('/login'));
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
*/

export const App: React.FC = () => (
  <Switch>
    <Route path="/companies" component={Companies} />
    <Route path="/documents" component={Documents} />
  </Switch>
);
