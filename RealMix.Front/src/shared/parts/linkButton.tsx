import React from 'react';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';

import { Button, ButtonProps } from 'shared/base/button';

interface LinkButtonProps extends ButtonProps {
  to: LocationDescriptor;
}

export const LinkButton: React.FC<LinkButtonProps> = props => {
  return <Button tag={Link} {...props} />;
};
