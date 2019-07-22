import React, { useState, useEffect } from 'react';
import { Spinner, Line, Block } from 'shared';

export const asyncComponentFactory = (importComponent: () => Promise<any>) => {
  return (props: any) => {
    const [Comp, setComp] = useState<any>(null);

    useEffect(() => {
      importComponent().then(cmp => {
        console.log('COMPONENT LOADED', cmp);
        setComp(cmp.default);
      });
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
