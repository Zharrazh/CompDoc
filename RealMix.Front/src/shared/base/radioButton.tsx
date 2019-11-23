import React, { useCallback } from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps {
  name: string;
  checked: boolean;
  value?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  id: string;
}

export const RadioButton: React.FC<Props> = ({
  name,
  value,
  className,
  onChange,
  children,
  disabled,
  checked,
  id,
  ...other
}) => {
  const classes = classNames('form-check', propsToSpace(other), className);
  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange]);
  return (
    <div className={classes} {...other}>
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onchange}
        disabled={disabled}></input>
      {children && (
        <label className="form-check-label" htmlFor={id}>
          {children}
        </label>
      )}
    </div>
  );
};
