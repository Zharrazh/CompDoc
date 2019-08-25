import React from 'react';
import classNames from 'classnames';

import './staticCell.scss';

interface Props {
  value: React.ReactChild;
  justifyContent?: 'center' | 'right';
}

export const StaticCell = ({ value, justifyContent }: Props) => (
  <div
    className={classNames('staticCell', {
      'justify-content-center': justifyContent === 'center',
      'justify-content-end': justifyContent === 'right'
    })}>
    <div>{value}</div>
  </div>
);
