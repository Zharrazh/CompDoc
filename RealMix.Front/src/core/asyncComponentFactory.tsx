import React, { useState, useEffect } from 'react';

import { Spinner, Line, Block } from 'shared';

export const asyncComponentFactory = (importComponent: () => Promise<any>, componentName: string) => {
  return (props: any) => {
    const [Comp, setComp] = useState<any>(null);

    useEffect(() => {
      importComponent()
        .then(cmp => {
          console.log('COMPONENT LOADED', cmp);
          return setComp(cmp[componentName]);
        })
        .catch(err => console.log(err));
    }, []);

    return Comp ? (
      <Comp {...props}></Comp>
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
};
