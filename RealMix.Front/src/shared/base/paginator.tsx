import React from 'react';
import classNames from 'classnames';

import { Line } from './line';
import { Button } from './button';
import { ButtonGroup } from './buttonGroup';

type Props = {
  totalPages: number;
  currentPage: number;
  onChange: (value: number) => void;
};
export const Paginator: React.FC<Props> = ({ totalPages, currentPage, onChange }) => {
  const isLeftPageCurrent = currentPage === 1 || currentPage === 2;
  const isRightPageCurrent = (currentPage === totalPages || currentPage === totalPages - 1) && totalPages > 2;
  const isLastPageShowed = totalPages >= 3;
  const isMiddlePageCurrent = !(isLeftPageCurrent || isRightPageCurrent);
  const getAdjacentPages = (page: number) => {
    const pages = [];
    for (let i = page - 1; i <= page + 1; i++) {
      if (i >= 1 && i <= totalPages) {
        pages.push(
          <Button
            key={i}
            secondary
            className={classNames({ active: i === currentPage })}
            onClick={() => {
              onChange(i);
            }}>
            {i}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <Line>
      <ButtonGroup>
        {isLeftPageCurrent && getAdjacentPages(currentPage)}
        {isLeftPageCurrent || (
          <>
            <Button
              secondary
              onClick={() => {
                onChange(1);
              }}>
              1
            </Button>
            <span>...</span>
          </>
        )}

        {isMiddlePageCurrent && <>{getAdjacentPages(currentPage)}</>}
        {isRightPageCurrent && getAdjacentPages(currentPage)}
        {!isRightPageCurrent && isLastPageShowed && (
          <>
            <span>...</span>
            <Button
              secondary
              onClick={() => {
                onChange(totalPages);
              }}>
              {totalPages}
            </Button>
          </>
        )}
      </ButtonGroup>
    </Line>
  );
};
