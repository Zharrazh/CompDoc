import React, { useMemo, useState, useCallback } from 'react';

import { StaticCell } from './staticCell';

import './inputCell.scss';

interface Props {
  value: string;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: string) => any;
}

export const InputCell = ({
  value: originalValue,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange
}: Props) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);

  const value = useMemo(() => (originalValue != null ? originalValue : ''), [originalValue]);

  const onchangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return editMode ? renderEditor(value, onchangeCallback, onBlurCallback) : renderViewer(value, doubleClickCallback);
};

const renderViewer = (value: string, doubleClickCallback: () => void) => {
  return <StaticCell onDoubleClick={doubleClickCallback}>{value}</StaticCell>;
};

const renderEditor = (
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: () => void
) => {
  return <input autoFocus className="inputCell" value={value} onChange={e => onChange(e)} onBlur={onBlur}></input>;
};
