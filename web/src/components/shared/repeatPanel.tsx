import React from 'react';
import { ActionType } from 'actions/actionType';
import { findLoaderItem } from 'core/reduxHelper';
import { useSelector } from 'react-redux';

import { Button, Line, Spinner } from 'components/shared/base';
import { StoreType } from 'core/store';

interface Props {
  actionType: ActionType;
  action: () => any;
  mod?: string;
}

export const RepeatPanel: React.FC<React.PropsWithChildren<Props>> = ({ actionType, action, mod = undefined, children }) => {
  const item = useSelector((state: StoreType) => findLoaderItem(state.loader, actionType, mod));
  if (item && item.isWait)
    return (
      <Line justifyContent="center" alignItems="center">
        <Spinner />
        <span className="ml-2">Loading...</span>
      </Line>
    );
  if (item && item.isError)
    return (
      <Line vertical justifyContent="center" alignItems="center">
        <div>Could not load data from the server.</div>
        <div>Press repeat button to reload data.</div>
        <Button primary small onClick={action}>Repeat</Button>
      </Line>
    );
  return <>{children}</>;
}