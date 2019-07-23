import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { ColorProps, propsToColor } from './utils/colorUtil';
import { BorderProps, propsToBorder } from './utils/borderUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

interface Props extends SpaceProps, ColorProps, BorderProps, SizeProps {
  tag?: React.ElementType;
  className?: string;
  inline?: boolean;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Block: React.FC<Props> = ({ tag: Tag = 'div', className, inline, onClick, children, ...other }) => {
  const classes = classNames(
    inline ? 'd-inline' : 'd-block',
    propsToSpace(other),
    propsToColor(other),
    propsToBorder(other),
    propsToSize(other),
    className
  );
  return (
    <Tag className={classes} onClick={onClick} {...other}>
      {children}
    </Tag>
  );
};
