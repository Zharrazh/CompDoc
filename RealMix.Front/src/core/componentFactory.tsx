import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const componentFactory: (classes?: string, tag?: React.ElementType) => React.FC<Props> =
  (classes, Tag = 'div') => ({ className, children, ...other }) => (
    <Tag className={classNames(classes, className)} {...other}>
      {children}
    </Tag>
  );