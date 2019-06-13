import React from 'react';
import classNames from 'classnames';

interface Props {
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
    }, className);
    return <div className="table-responsive"><table className={classes} {...other}>{children}</table></div>
  };