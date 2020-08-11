import React, { useCallback } from 'react';

import { Block } from './block';
import { Line } from './line';
import { Icon } from './icon';

export const Order: React.FC<{
  name: string;
  state: 'asc' | 'desc' | 'none';
  onClick: (name: string, sortBy: 'asc' | 'desc') => void;
}> = ({ name, state, onClick, children }) => {
  let angle;
  if (state === 'asc') angle = <Icon name={'angle-down'} className={'fa-rotate-180'} />;
  else if (state === 'desc') angle = <Icon name={'angle-down'} />;

  const clickHandler = useCallback(() => {
    const nextState = state !== 'desc' ? 'desc' : 'asc';
    onClick(name, nextState);
  }, [name, onClick, state]);
  return (
    <Block onClick={clickHandler}>
      <Line>
        <Block inline mr="2">
          {children}
        </Block>
        <Block inline>{angle}</Block>
      </Line>
    </Block>
  );
};
