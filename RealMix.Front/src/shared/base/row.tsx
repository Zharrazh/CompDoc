import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

interface Props extends SpaceProps, SizeProps {
  tag?: React.ElementType;
  className?: string;
  noGutters?: boolean;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

export const Row: React.FC<Props> =
  ({ tag: Tag = 'div', className, noGutters, justifyContent, alignItems, children, ...other }) => {
    const classes = classNames('row',
      {
        [`justify-content-md-${justifyContent}`]: justifyContent != null,
        [`align-items-md-${alignItems}`]: alignItems != null,
        'no-gutters': noGutters
      },
      propsToSpace(other), propsToSize(other), className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };