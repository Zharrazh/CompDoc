import React from 'react';
import classNames from 'classnames';

interface Props {
  tag?: React.ElementType;
  className?: string;
  noGutters?: boolean;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

export const Row: React.FC<React.PropsWithChildren<Props>> =
  ({ tag: Tag = 'div', className, noGutters, justifyContent = 'start', alignItems = 'stretch', children, ...other }) => {
    const classes = classNames('row',
      `justify-content-md-${justifyContent}`,
      `align-items-md-${alignItems}`,
      { 'no-gutters': noGutters },
      className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };