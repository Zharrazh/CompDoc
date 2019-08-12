import React from 'react';

import { Spinner, Block, Icon } from 'shared';
import { ActionType } from 'data/actionTypes';
import { useLoader } from 'core/useLoader';

interface Props {
  actionType?: ActionType;
  action?: () => any;
  mod?: string;
}

export const RepeatWrapper: React.FC<Props> = ({ actionType, action, mod = undefined, children }) => {
  const item = useLoader(actionType != null ? actionType : ('nope' as ActionType), mod);

  if (item && item.isWait)
    return (
      <Block>
        <Spinner />
        {children}
      </Block>
    );
  if (item && item.isError)
    return (
      <Block>
        <Block onClick={action}>
          <Icon name="exclamation-circle"></Icon>
        </Block>
        {children}
      </Block>
    );
  return <Block>{children}</Block>;
};
