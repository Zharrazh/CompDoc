import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps {
  className?: string;
}

export const Spinner: React.FC<Props> = ({ className, ...other }) => {
  const classes = classNames('spinner-border', propsToSpace(other), className);
  return (
    <div className={classes} role="status" {...other}>
      <span className="sr-only"></span>
    </div>
  );
}