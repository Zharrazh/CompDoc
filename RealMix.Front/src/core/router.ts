import { __RouterContext, RouteComponentProps } from 'react-router';
import { useContext } from 'react';
import { Location } from 'history';

import { ActionType } from 'app/actionTypes';

import { createAction } from './redux';

// The react-router guys say that this will be what the official API probably looks like
// https://github.com/ReactTraining/react-router/pull/6453#issuecomment-474600561

export const useLocation = () => {
  const context = useContext(__RouterContext);
  return context.location;
};

export function useMatch<P = {}>() {
  const context = useContext(__RouterContext) as RouteComponentProps<P>;
  return context.match;
}

export function useParams<P = {}>() {
  const context = useContext(__RouterContext) as RouteComponentProps<P>;
  return context.match.params;
}

export const pushRoute = createAction<string | Location>(ActionType.CORE_ROUTER_PUSH);
export const goBackRoute = createAction<never>(ActionType.CORE_ROUTER_GOBACK);
