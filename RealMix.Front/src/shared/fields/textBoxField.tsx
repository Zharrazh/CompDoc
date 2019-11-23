import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ObjectSchema, reach } from 'yup';

interface Props {
  name: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  schema?: ObjectSchema<any>;
  fieldPath?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  type?: string;
}

export const TextBoxField: React.FC<Props> = ({
  name,
  value,
  type = 'text',
  onChange,
  placeholder,
  schema,
  fieldPath,
  size,
  children
}) => {
  value = value == null ? '' : value;
  const [message, setMessage] = useState(null);
  useEffect(() => {
    let canceled = false;
    if (schema != null && fieldPath != null) {
      reach(schema, fieldPath)
        .validate(value)
        .then(() => {
          if (!canceled) setMessage(null);
        })
        .catch(x => {
          if (!canceled) setMessage(x.message);
        });
    }
    return () => {
      canceled = true;
    };
  });

  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
      {children && <label htmlFor={name}>{children}</label>}
      <input
        type={type}
        className={classNames('form-control', { 'is-invalid': message })}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onchange}
        value={value}
      />
      <div className="invalid-feedback">{message}</div>
    </div>
  );
};
