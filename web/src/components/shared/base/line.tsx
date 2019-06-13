import React from 'react';
import classNames from 'classnames';

interface Props {
  tag?: React.ElementType;
  className?: string;
  vertical?: boolean;
  wrap?: boolean;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

export const Line: React.FC<React.PropsWithChildren<Props>> =
  ({ tag: Tag = 'div', className, vertical, justifyContent = 'start', alignItems = 'stretch', wrap, children, ...other }) => {
    const classes = classNames('d-md-flex',
      vertical ? 'flex-md-column' : 'flex-md-row',
      `justify-content-md-${justifyContent}`,
      `align-items-md-${alignItems}`, {
        'flex-md-wrap': wrap
      }, className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };