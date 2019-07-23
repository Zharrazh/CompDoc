import React, { useState, useEffect } from 'react';

import { Spinner, Line, Block } from 'shared';

interface Props {
  name: string;
  get: () => Promise<any>;
  [key: string]: any;
}

export const AsyncComponent: React.FC<Props> = ({ name, get, ...other }) => {
  const [Comp, setComp] = useState<any>(null);

  useEffect(() => {
    get()
      .then(cmp => {
        console.log('COMPONENT LOADED', cmp);
        return setComp(cmp[name]);
      })
      .catch(err => console.log(err));
  }, [name, get]);

  return Comp ? (
    <Comp {...other}></Comp>
  ) : (
    <Line justifyContent="center" alignItems="center">
      <Spinner />
      <Block inline ml="2">
        {' '}
        Loading...
      </Block>
    </Line>
  );
};
