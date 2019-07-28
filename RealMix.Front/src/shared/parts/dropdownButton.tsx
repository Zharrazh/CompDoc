import React, { useState } from 'react';

import { Button, ButtonProps } from 'shared/base/button';
import { ButtonGroup } from 'shared';

interface DropdownButtonProps extends ButtonProps {
  label?: React.ReactElement;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, children, ...other }) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
    <ButtonGroup>
      <Button className="dropdown-toggle" onClick={toggle} {...other}>
        {label}
      </Button>
      {show && <div className="dropdown-menu show">{children}</div>}
    </ButtonGroup>
  );
};
