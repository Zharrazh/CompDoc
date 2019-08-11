import React from 'react';
import { LocationDescriptor } from 'history';
import { useDispatch } from 'react-redux';

import { Button, ButtonProps } from 'shared/base/button';
import { useMatch, pushRoute, goBackRoute } from 'core/router';

interface CancelButtonProps extends ButtonProps {
  to?: LocationDescriptor;
  toParent?: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ to, toParent, children, ...other }) => {
  const dispatch = useDispatch();
  const match = useMatch();
  const go = () => {
    if (to != null) {
      dispatch(pushRoute(to.toString()));
      return;
    }
    if (toParent) {
      const url = match.url.replace(/\/[\w.-]*?$/, '');
      dispatch(pushRoute(url));
      return;
    }
    dispatch(goBackRoute());
  };
  return (
    <Button secondary outline onClick={go} {...other}>
      {children == null ? 'Cancel' : children}
    </Button>
  );
};
