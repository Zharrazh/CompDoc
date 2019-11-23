import React from 'react';
import classNames from 'classnames';

import './staticCell.scss';

interface Props extends React.HTMLAttributes<any> {
  justifyContent?: 'start' | 'center' | 'end';
}

export const StaticCell: React.FC<Props> = ({ className, children, justifyContent, ...other }) => (
  <div
    className={classNames('staticCell', className, { [`justify-content-${justifyContent}`]: justifyContent != null })}
    {...other}>
    <div>{children}</div>
  </div>
);
