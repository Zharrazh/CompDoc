import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { LocationDescriptor } from 'history';

import './dropdownItem.scss';

interface Props {
  tag?: React.ElementType;
  to?: LocationDescriptor;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const DropdownItem: React.FC<Props> = ({ tag: Tag = 'a', className, onClick, children, ...other }) => {
  const classes = classNames('dropdown-item', className);
  return (
    <Tag className={classes} onClick={onClick} {...other}>
      {children}
    </Tag>
  );
};
