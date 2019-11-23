import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ObjectSchema } from 'yup';

interface Props<TOption extends object | string | number> {
  name: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  schema?: ObjectSchema<any>;
  fieldPath?: string;
  options: Map<string, TOption>;
  getLabel: (option: TOption) => string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  addEmptyOption?: boolean;
  children?: React.ReactChild;
}

export const SelectField = <TOption extends object | string | number>({
  name,
  value,
  onChange,
  schema,
  fieldPath,
  options,
  getLabel,
  size,
  addEmptyOption = false,
  children
}: Props<TOption>) => {
  value = value == null ? '' : value;
  const [message, setMessage] = useState(null);
  useEffect(() => {
    let canceled = false;
    if (schema != null && fieldPath != null)
      schema
        .validateAt(fieldPath, value)
        .then(() => {
          if (!canceled) setMessage(null);
          return null;
        })
        .catch(x => {
          if (!canceled) setMessage(x.message);
          return null;
        });
    return () => {
      canceled = true;
    };
  });

  const onchange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value), [onChange]);

  return (
    <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
      {children && <label htmlFor={name}>{children}</label>}
      <select className="form-control" id={name} name={name} value={value} onChange={onchange}>
        {renderFirstOption(addEmptyOption, value)}
        {options != null &&
          Array.from(options).map(([key, item]) => (
            <option key={key} value={key}>
              {getLabel(item)}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{message}</div>
    </div>
  );
};

const renderFirstOption = (addEmptyOption: boolean, value: string) => {
  if (addEmptyOption) return <option value="" />;
  if (value === '') return <option value="" disabled></option>;
  return undefined;
};
