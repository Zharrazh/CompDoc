import React, { useMemo, useState, useCallback } from 'react';

import { StaticCell } from './staticCell';

import './selectCell.scss';

interface Props<TOption extends object> {
  value: string;
  options: Map<string, TOption>;
  getLabel: (option: TOption) => string;
  addEmptyOption?: boolean;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: string) => any;
}

export const SelectCell = <TOption extends object>({
  value: originalValue,
  options,
  getLabel,
  addEmptyOption = false,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange
}: Props<TOption>) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);

  const value = useMemo(() => (originalValue != null ? originalValue : ''), [originalValue]);

  const onchangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (editMode === true) onChange(e.target.value);
    },
    [editMode, onChange]
  );

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(true);
  }, [canChangeMode]);

  const onBlurCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(false);
  }, [canChangeMode]);

  return editMode
    ? renderEditor(value, options, getLabel, onchangeCallback, addEmptyOption, onBlurCallback)
    : renderViewer(value, options, getLabel, doubleClickCallback);
};

const renderViewer = <TOption extends object>(
  value: string,
  options: Map<string, TOption>,
  getLabel: (option: TOption) => string,
  doubleClickCallback: () => void
) => {
  const option = options != null ? options.get(value) : null;
  return <StaticCell onDoubleClick={doubleClickCallback}>{option != null ? getLabel(option) : value}</StaticCell>;
};

const renderEditor = <TOption extends object>(
  value: string,
  options: Map<string, TOption>,
  getLabel: (option: TOption) => string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  addEmptyOption: boolean,
  onBlur: () => void
) => {
  return (
    <select autoFocus className="selectCell" value={value} onChange={e => onChange(e)} onBlur={onBlur}>
      {renderFirstOption(addEmptyOption, value)}
      {options != null &&
        Array.from(options).map(([key, item]) => (
          <option key={key} value={key}>
            {getLabel(item)}
          </option>
        ))}
    </select>
  );
};

const renderFirstOption = (addEmptyOption: boolean, value: string) => {
  if (addEmptyOption) return <option value="" />;
  if (value === '') return <option value="" disabled></option>;
  return undefined;
};
