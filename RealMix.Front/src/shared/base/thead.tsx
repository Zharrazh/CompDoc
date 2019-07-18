import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  light?: boolean;
  dark?: boolean;
}

export const THead: React.FC<Props> =
  ({ className, light, dark, children }) => {
    const classes = classNames({
      'thead-dark': dark,
      'thead-light': light,
    }, className);
    return <thead className={classes}>{children}</thead>
  };