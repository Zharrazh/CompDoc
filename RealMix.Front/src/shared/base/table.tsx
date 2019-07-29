import React from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

import './table.scss';

interface Props extends SpaceProps {
  className?: string;
  striped?: boolean;
  dark?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  hover?: boolean;
  small?: boolean;
  minHeight?: boolean;
}

export const Table: React.FC<Props> = ({
  className,
  striped,
  dark,
  bordered,
  borderless,
  hover,
  small,
  children,
  minHeight,
  ...other
}) => {
  const classes = classNames(
    'table',
    {
      'table-striped': striped,
      'table-dark': dark,
      'table-bordered': bordered,
      'table-borderless': borderless,
      'table-hover': hover,
      'table-sm': small
    },
    propsToSpace(other),
    className
  );

  return (
    <div className={classNames('table-responsive', { minHeight })} {...other}>
      <table className={classes}>{children}</table>
    </div>
  );
};
