import React, { useCallback } from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CheckBox: React.FC<Props> = ({
  name,
  value,
  inline,
  className,
  onChange,
  children,
  disabled,
  ...other
}) => {
  const classes = classNames('form-check', { 'form-check-inline': inline }, propsToSpace(other), className);
  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange]);
  return (
    <div className={classes} {...other}>
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        checked={value}
        onChange={onchange}
        disabled={disabled}></input>
      {children && (
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
      )}
    </div>
  );
};
