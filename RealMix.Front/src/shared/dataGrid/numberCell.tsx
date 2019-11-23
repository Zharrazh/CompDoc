import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { StaticCell } from './staticCell';

import './numberCell.scss';

interface Props {
  value?: number;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: number) => any;
  hideZeros?: boolean;
  integer?: boolean;
  format?: (value: number | undefined) => string;
  justifyContent?: 'start' | 'center' | 'end';
}

export const NumberCell = ({
  value: originalValue,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange,
  hideZeros,
  integer,
  format,
  justifyContent = 'end'
}: Props) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);
  const [model, setModel] = useState<{ value: string; cursorPos: number | null }>();
  const value = model?.value ?? '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setModel({ value: originalValue != null && originalValue !== 0 ? originalValue.toString() : '', cursorPos: null });
  }, [originalValue]);

  useLayoutEffect(() => {
    if (inputRef.current != null && model?.cursorPos != null)
      inputRef.current.setSelectionRange(model.cursorPos, model.cursorPos);
  }, [model]);

  const onChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (editMode == true) {
        let v = e.target.value
          .trim()
          .replace(integer ? /[^0-9+-]/g : /[^0-9.+-]/g, '')
          .replace(/[+-]/g, (x, y) => (y > 0 ? '' : x));
        if (!integer) {
          const indexOfDot = v.indexOf('.');
          if (indexOfDot >= 0) v = v.replace(/[.]/g, (x, y) => (y > indexOfDot ? '' : x));
        }
        if (v.length > 0) {
          const pattern = `([+-]?[0-9]*${integer ? '' : '(\\.[0-9]*)?'})`;
          const matched = v.match(pattern)?.[0];
          setModel({
            value: matched != null ? matched.substr(0, 20) : '',
            cursorPos: e.target.selectionEnd
          });
        } else {
          setModel({ value: '', cursorPos: 0 });
        }
      }
    },
    [editMode, integer]
  );

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(true);
  }, [canChangeMode]);

  const onBlurCallback = useCallback(() => {
    if (canChangeMode === true) {
      setEditMode(false);
      onChange(value === '' ? 0 : parseFloat(value));
    }
  }, [canChangeMode, onChange, value]);

  return editMode
    ? renderEditor(value, inputRef, onBlurCallback, onChangeCallback)
    : renderViewer(originalValue, hideZeros, doubleClickCallback, justifyContent, format);
};

const renderViewer = (
  value: number | undefined,
  hideZeros: boolean | undefined,
  doubleClickCallback: () => void,
  justifyContent: 'start' | 'center' | 'end',
  format?: (value: number | undefined) => string
) => (
  <StaticCell onDoubleClick={doubleClickCallback} className="numberCell" justifyContent={justifyContent}>
    {hideZeros && (value == null || value === 0) ? '' : format != null ? format(value) : value?.toFixed(2)}
  </StaticCell>
);

const renderEditor = (
  value: string,
  inputRef: React.RefObject<HTMLInputElement>,
  onBlur: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => <input ref={inputRef} value={value} autoFocus className="numberCell" onBlur={onBlur} onChange={onChange} />;
