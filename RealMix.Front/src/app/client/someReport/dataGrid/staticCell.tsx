import React from 'react';
import classNames from 'classnames';

import './staticCell.scss';

interface Props extends React.HTMLAttributes<any> {
  justifyContent?: 'center' | 'right';
}

export const StaticCell: React.FC<Props> = ({ className, children, justifyContent, ...other }) => (
  <div
    className={classNames('staticCell', className, {
      'justify-content-center': justifyContent === 'center',
      'justify-content-end': justifyContent === 'right'
    })}
    {...other}>
    <div>{children}</div>
  </div>
);
