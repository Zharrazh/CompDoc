import React from 'react';
import classNames from 'classnames';

interface Props {
  tag?: React.ElementType;
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> =
  ({ tag: Tag = 'div', className, children, ...other }) => {
    const classes = classNames('container', className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };