import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { ObjectSchema, reach } from 'yup';
import has from 'lodash/has';

interface Props {
  data: any;
  field: string;
  onChange: (field: string, value: string) => void;
  v?: ObjectSchema<any>;
  values: any[];
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  key?: number | string;
  addEmptyOption?: boolean;
  valueField?: string;
  nameField?: string;
}

export const SelectField: React.FC<Props> = ({
  data,
  field,
  onChange,
  nameField = 'name',
  valueField = 'id',
  addEmptyOption = false,
  v,
  size,
  key,
  values,
  children
}) => {
  const value = data[field] == null ? '' : data[field];
  const [message, setMessage] = useState(null);
  useEffect(() => {
    let canceled = false;
    if (v != null && has(v, 'fields') && has(v, 'fields.' + field))
      reach(v, field)
        .validate(value)
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
  return (
    <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
      {children && <label htmlFor={`${field}${key}`}>{children}</label>}
      <select
        className="form-control"
        id={`${field}${key}`}
        name={`${field}${key}`}
        value={value}
        onChange={e => onChange(field, e.target.value)}>
        {renderFirstOption(addEmptyOption, value)}
        {values.map(item => (
          <option key={item[valueField]} value={item[valueField]}>
            {item[nameField]}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{message}</div>
    </div>
  );
};

const renderFirstOption = (addEmptyOption: boolean, value: any) => {
  if (addEmptyOption) return <option value="" />;
  if (value === '') return <option value="" disabled></option>;
  return undefined;
};
