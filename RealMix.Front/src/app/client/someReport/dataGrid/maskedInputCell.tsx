import React, { useState, useCallback } from 'react';
import TextMask, { conformToMask } from 'react-text-mask';

import { StaticCell } from './staticCell';

import './maskedInputCell.scss';

interface Props {
  value: string;
  mask: (string | RegExp)[];
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: string) => any;
}

export const MaskedInputCell = ({
  value: originalValue,
  mask,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange
}: Props) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);
  const [value, setValue] = useState(
    originalValue != null
      ? conformToMask(originalValue, mask, { guide: true }).conformedValue
      : conformToMask('', mask, { guide: true }).conformedValue
  );

  const onChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (editMode == true) setValue(e.target.value);
    },
    [editMode]
  );

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(true);
  }, [canChangeMode]);

  const onBlurCallback = useCallback(() => {
    if (canChangeMode === true) {
      setEditMode(false);
      onChange(value.replace(/_/g, '0'));
    }
  }, [canChangeMode, onChange, value]);

  return editMode
    ? renderEditor(value, mask, onBlurCallback, onChangeCallback)
    : renderViewer(value, mask, doubleClickCallback);
};

const renderViewer = (time: string, mask: (string | RegExp)[], doubleClickCallback: () => void) => {
  return (
    <StaticCell onDoubleClick={doubleClickCallback}>
      {conformToMask(time.replace(/_/g, '0'), mask, { guide: false }).conformedValue}
    </StaticCell>
  );
};

const renderEditor = (
  value: string,
  mask: (string | RegExp)[],
  onBlur: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (
    <TextMask
      value={value}
      autoFocus
      className="maskedInput"
      mask={mask}
      onBlur={onBlur}
      keepCharPositions={true}
      onChange={onChange}
    />
  );
};
