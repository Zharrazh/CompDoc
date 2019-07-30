import React from 'react';
import { LocationDescriptor } from 'history';

import { Button, ButtonProps } from 'shared/base/button';
import { useHistory, useMatch } from 'core/routerHooks';

interface CancelButtonProps extends ButtonProps {
  to?: LocationDescriptor;
  toParent?: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ to, toParent, children, ...other }) => {
  const history = useHistory();
  const match = useMatch();
  const go = () => {
    if (to != null) {
      history.push(to.toString());
      return;
    }
    if (toParent) {
      const url = match.url.replace(/\/[\w.-]*?$/, '');
      history.push(url);
      return;
    }
    history.goBack();
  };
  return (
    <Button secondary outline onClick={go} {...other}>
      {children == null ? 'Cancel' : children}
    </Button>
  );
};
