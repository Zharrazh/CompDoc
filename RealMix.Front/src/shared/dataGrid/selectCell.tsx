import React, { useMemo } from 'react';

import { StaticCell } from './staticCell';

interface Props<TOption extends object> {
  value: string;
  options: Map<string, TOption>;
  getLabel: (option: TOption) => string;
  readonly?: boolean;
  addEmptyOption?: boolean;
  onChange: (value: string) => any;
}

export const SelectCell = <TOption extends object>(props: Props<TOption>) => {
  const value = useMemo(() => (props.value != null ? props.value : ''), [props.value]);
  return props.readonly ? renderEditor(value, props) : renderViewer(value, props);
};

const renderViewer = <TOption extends object>(value: string, { options, getLabel }: Props<TOption>) => {
  const option = options != null ? options.get(value) : null;
  return <StaticCell value={option != null ? getLabel(option) : value}></StaticCell>;
};

const renderEditor = <TOption extends object>(
  value: string,
  { options, getLabel, addEmptyOption = false, onChange }: Props<TOption>
) => {
  return (
    <div className="selectCell">
      <select value={value} onChange={e => onChange(e.target.value)}>
        {renderFirstOption(addEmptyOption, value)}
        {options != null &&
          Array.from(options).map(([key, item]) => (
            <option key={key} value={key}>
              {getLabel(item)}
            </option>
          ))}
      </select>
    </div>
  );
};

const renderFirstOption = (addEmptyOption: boolean, value: string) => {
  if (addEmptyOption) return <option value="" />;
  if (value === '') return <option value="" disabled></option>;
  return undefined;
};
