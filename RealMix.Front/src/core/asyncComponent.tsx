import React, { FunctionComponent, Suspense } from 'react';

import { Spinner, Line, Block } from 'shared';

const fallback = (
  <Line justifyContent="center" alignItems="center">
    <Spinner />
    <Block inline ml="2">
      Loading...
    </Block>
  </Line>
);

export const asyncComponent = (get: () => Promise<FunctionComponent<any>>): React.FC => {
  const Comp = React.lazy(() => get().then(x => ({ default: x })));
  return () => (
    <Suspense fallback={fallback}>
      <Comp></Comp>
    </Suspense>
  );
};
