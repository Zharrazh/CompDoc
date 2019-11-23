import React, { useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { stringify } from 'query-string';
import classNames from 'classnames';

import { useLocation, pushRoute, useLocationParams } from 'core/router';
import { RepeatControl } from 'shared';
import { ActionType } from 'data/actionTypes';

interface Props<TOption extends object> {
  label?: string;
  name: string;
  getLabel?: (option: TOption) => string;
  getValue?: (option: TOption) => string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  options: TOption[];
  addEmptyOption?: boolean;
  actionType?: ActionType;
  action?: () => any;
  mod?: string;
  dontSelectFirstItem?: boolean;
}

export const SelectFilter = <TOption extends object>({
  label,
  name,
  options,
  size,
  getLabel = (o: any): string => o.name,
  getValue = (o: any): string => o.id,
  addEmptyOption = false,
  actionType,
  action,
  mod,
  dontSelectFirstItem
}: Props<TOption>) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useLocationParams();
  const value = useMemo(() => {
    const v = params[name] as string;
    return v != null ? v : '';
  }, [params, name]);
  const onChange = useCallback(
    (value: string) => dispatch(pushRoute({ ...location, search: stringify({ ...params, [name]: value }) })),
    [name, params, location, dispatch]
  );
  useEffect(() => {
    if (!dontSelectFirstItem && value === '' && Array.isArray(options) && options.length > 0)
      onChange(getValue(options[0]));
  }, [value, options, getValue, onChange, dontSelectFirstItem]);
  return (
    <div className={classNames('input-group', { [`col-md-${size}`]: size != null })}>
      {label && (
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={'filter_' + name}>
            {label}
          </label>
        </div>
      )}
      <RepeatControl actionType={actionType} action={action} mod={mod}>
        <select
          className="form-control"
          id={'filter_' + name}
          name={'filter_' + name}
          value={value}
          onChange={e => onChange(e.target.value)}>
          {renderFirstOption(addEmptyOption, value)}
          {options.map(item => (
            <option key={getValue(item)} value={getValue(item)}>
              {getLabel(item)}
            </option>
          ))}
        </select>
      </RepeatControl>
    </div>
  );
};

const renderFirstOption = (addEmptyOption: boolean, value: string) => {
  if (addEmptyOption) return <option value="" />;
  if (value === '') return <option value="" disabled></option>;
  return undefined;
};
