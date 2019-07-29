import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { Button, ButtonProps } from 'shared/base/button';

import './dropdownButton.scss';

interface DropdownButtonProps extends ButtonProps {
  label?: React.ReactElement;
  rightAlignment?: boolean;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, rightAlignment, children, ...other }) => {
  const [show, setShow] = useState(false);
  const focusHolder = useRef<any>(null);
  const activate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
    focusHolder.current.focus();
  };
  const deactivate = () => setShow(false);
  return (
    <div
      className="rm-dropdownButton btn-group"
      onMouseDown={activate}
      onBlur={deactivate}
      tabIndex={0}
      role="button"
      ref={focusHolder}>
      <Button className="dropdown-toggle" onClick={activate} {...other}>
        {label}
      </Button>
      {show && (
        <div className={classNames('dropdown-menu show', { 'dropdown-menu-right': rightAlignment })}>{children}</div>
      )}
    </div>
  );
};
