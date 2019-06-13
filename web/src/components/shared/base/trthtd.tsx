import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  active?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  light?: boolean;
  dark?: boolean;
}

function propsToColors({ active, primary, secondary, success, danger, warning, info, light, dark }: Props) {
  return {
    'table-active': active,
    'table-primary': primary,
    'table-secondary': secondary,
    'table-success': success,
    'table-danger': danger,
    'table-warning': warning,
    'table-info': info,
    'table-light': light,
    'table-dark': dark
  };
}

export const Tr: React.FC<React.PropsWithChildren<Props>> =
  ({ className, children, ...other }) => {
    const classes = classNames(propsToColors(other), className);
    return <tr className={classes} {...other}>{children}</tr>
  };

export const Th: React.FC<React.PropsWithChildren<Props>> =
  ({ className, children, ...other }) => {
    const classes = classNames(propsToColors(other), className);
    return <th className={classes} {...other}>{children}</th>
  };

export const Td: React.FC<React.PropsWithChildren<Props>> =
  ({ className, active, primary, secondary, success, danger, warning, info, light, dark, children, ...other }) => {
    const classes = classNames(propsToColors(other), className);
    return <td className={classes} {...other}>{children}</td>
  };