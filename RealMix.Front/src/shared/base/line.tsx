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

export const Line: React.FC<Props> = ({
  tag: Tag = 'div',
  className,
  vertical,
  justifyContent,
  alignItems,
  wrap,
  children,
  ...other
}) => {
  const classes = classNames(
    'd-flex',
    vertical ? 'flex-column' : 'flex-row',
    {
      [`justify-content-${justifyContent}`]: justifyContent != null,
      [`align-items-${alignItems}`]: alignItems != null,
      'flex-wrap': wrap
    },
    propsToSpace(other),
    propsToSize(other),
    className
  );
  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
};
