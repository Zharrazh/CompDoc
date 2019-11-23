import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';

import './dropdownCellWrapper.scss';

interface Props {
  content: JSX.Element;
  dropdown: JSX.Element;
}

export const DropdownCellWrapper = ({ content, dropdown }: Props) => {
  return (
    <Manager>
      <Reference>{({ ref }) => <div ref={ref}>{content}</div>}</Reference>
      <Popper placement="bottom">
        {({ ref, style, placement, arrowProps }) => (
          <div className="dropdown" ref={ref} style={style} data-placement={placement}>
            {dropdown}
            <div ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    </Manager>
  );
};
