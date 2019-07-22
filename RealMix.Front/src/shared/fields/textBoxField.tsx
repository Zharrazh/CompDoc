import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { ObjectSchema, reach } from 'yup';

interface Props {
  data: { [key: string]: any };
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
    if (v)
      reach(v, field)
        .validate(value)
        .then(x => setMessage(null))
        .catch(x => setMessage(x.message));
  });
  return (
    <div className="form-group">
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
