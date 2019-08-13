import React from 'react';

import { Spinner, Block, Icon } from 'shared';
import { ActionType } from 'data/actionTypes';
import { useLoader } from 'core/useLoader';

interface Props {
  actionType?: ActionType;
  action?: () => any;
  mod?: string;
}

export const RepeatControl: React.FC<Props> = ({ actionType, action, mod = undefined, children }) => {
  const item = useLoader(actionType != null ? actionType : ActionType.CORE_NOPE, mod);

  if (item && item.isWait)
    return (
      <Block className="form-control">
        <Spinner className="overlay" small />
      </Block>
    );
  if (item && item.isError) {
    const errors = Array.isArray(item.error) ? item.error.join('\r\n') : item.error;
    return (
      <Block className="form-control text-danger">
        <Block onClick={action} className="error" title={errors}>
          <Icon name="exclamation-circle"></Icon>
        </Block>
      </Block>
    );
  }
  return <>{children}</>;
};
