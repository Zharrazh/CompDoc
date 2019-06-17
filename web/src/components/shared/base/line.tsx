import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

interface Props extends SpaceProps, SizeProps {
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
      }, propsToSpace(other), propsToSize(other), className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };