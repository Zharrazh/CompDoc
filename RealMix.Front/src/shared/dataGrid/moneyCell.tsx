import React from 'react';

import { Icon } from 'shared';

import './moneyCell.scss';

interface Props {
  rate: any;
  dollars: any;
  showDollarAmount: boolean;
}

export const MoneyCell: React.FC<Props> = ({ rate, dollars, showDollarAmount }) => {
  return showDollarAmount && rate > 0 && dollars > 0 ? (
    <>
      <div>
        <Icon title="Dollar Amount" className="iconDollar" name="money-bill-alt"></Icon>
        {` $${dollars.toFixed(2)}`}
      </div>
      <div>
        <Icon title="Rate" className="iconRate" name="percent"></Icon>
        {' ' + rate.toFixed(2)}
      </div>
    </>
  ) : null;
};
