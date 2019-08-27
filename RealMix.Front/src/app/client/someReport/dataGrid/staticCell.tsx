import React from 'react';
import classNames from 'classnames';

import './staticCell.scss';

interface Props {
  justifyContent?: 'center' | 'right';
}

export const StaticCell: React.FC<Props> = ({ children, justifyContent }) => (
  <div
    className={classNames('staticCell', {
      'justify-content-center': justifyContent === 'center',
      'justify-content-end': justifyContent === 'right'
    })}>
    <div>{children}</div>
  </div>
);
