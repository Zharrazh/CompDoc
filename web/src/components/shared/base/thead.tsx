import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  light?: boolean;
  dark?: boolean;
}

export const THead: React.FC<React.PropsWithChildren<Props>> =
  ({ className, light, dark, children, ...other }) => {
    const classes = classNames({
      'thead-dark': dark,
      'thead-light': light,
    }, className);
    return <thead className={classes} {...other}>{children}</thead>
  };