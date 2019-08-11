import React from 'react';

import { Button, Line, Spinner, Block } from 'shared';
import { ActionType } from 'app/actionTypes';
import { useLoader } from 'core/useLoader';

interface Props {
  actionType: ActionType;
  action: () => any;
  mod?: string;
}

export const RepeatPanel: React.FC<Props> = ({ actionType, action, mod = undefined, children }) => {
  const item = useLoader(actionType, mod);
  if (item && item.isWait)
    return (
      <Line justifyContent="center" alignItems="center">
        <Spinner />
        <Block inline ml="2">
          Loading...
        </Block>
      </Line>
    );
  if (item && item.isError)
    return (
      <Line vertical justifyContent="center" alignItems="center">
        <div>Could not load data from the server.</div>
        <div>Press repeat button to reload data.</div>
        <Button primary small onClick={action}>
          Repeat
        </Button>
      </Line>
    );
  return <>{children}</>;
};
