import React from 'react';
import { Button, ButtonProps } from '../base/button';
import { Link } from 'react-router-dom';
import * as H from 'history';

interface LinkButtonProps extends ButtonProps {
  to: H.LocationDescriptor;
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return <Button tag={Link} {...props} />
}