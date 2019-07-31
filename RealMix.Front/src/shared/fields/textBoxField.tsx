import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { ObjectSchema, reach } from 'yup';
import has from 'lodash/has';

interface Props {
  data: any;
  field: string;
  onChange: (field: string, value: string) => void;
  placeholder?: string;
  v?: ObjectSchema<any>;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  key?: number | string;
  type?: string;
}

export const TextBoxField: React.FC<Props> = ({
  type = 'text',
  data,
  field,
  onChange,
  placeholder,
  v,
  size,
  key,
  children
}) => {
  const value = data[field] == null ? '' : data[field];
  const [message, setMessage] = useState(null);
  useEffect(() => {
    let canceled = false;
    console.log('*** EFFECT');
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
      console.log('*** cancelation');
      canceled = true;
    };
  });
  return (
    <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
      {children && <label htmlFor={`${field}${key}`}>{children}</label>}
      <input
        type={type}
        className={classNames('form-control', { 'is-invalid': message })}
        id={`${field}${key}`}
        placeholder={placeholder}
        onChange={e => onChange(field, e.target.value)}
        value={value}
      />
      <div className="invalid-feedback">{message}</div>
    </div>
  );
};
