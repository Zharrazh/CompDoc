import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

interface Props extends SpaceProps, SizeProps {
  tag?: React.ElementType;
  className?: string;
  fluid?: boolean;
}

export const Container: React.FC<React.PropsWithChildren<Props>> =
  ({ tag: Tag = 'div', fluid, className, children, ...other }) => {
    const classes = classNames(fluid ? 'container-fluid' : 'container',
      propsToSpace(other), propsToSize(other), className);
    return <Tag className={classes} {...other}>{children}</Tag>
  };