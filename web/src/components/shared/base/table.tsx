import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps {
  className?: string;
  striped?: boolean;
  dark?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  hover?: boolean;
  small?: boolean;
}

export const Table: React.FC<React.PropsWithChildren<Props>> =
  ({ className, striped, dark, bordered, borderless, hover, small, children, ...other }) => {
    const classes = classNames('table', {
      'table-striped': striped,
      'table-dark': dark,
      'table-bordered': bordered,
      'table-borderless': borderless,
      'table-hover': hover,
      'table-sm': small,
    }, propsToSpace(other), className);
    return <div className="table-responsive" {...other}><table className={classes}>{children}</table></div>
  };