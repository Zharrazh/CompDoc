import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { StaticCell } from './staticCell';
import './timeCell.scss';

interface Props {
  value?: number;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: number) => any;
  hideZeros?: boolean;
  ampm?: boolean;
  justifyContent?: 'start' | 'center' | 'end';
}

export const TimeCell: React.FC<Props> = ({
  value: originalValue,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange,
  hideZeros,
  ampm,
  children,
  justifyContent = 'end'
}) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);
  const [model, setModel] = useState<{ value: string; cursorPos: number | null }>();
  const value = model?.value ?? '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setModel({
      value: originalValue != null && originalValue > 0 ? formatMinutes(originalValue, ampm) : '',
      cursorPos: null
    });
  }, [originalValue, ampm]);

  useLayoutEffect(() => {
    if (inputRef.current != null && model?.cursorPos != null)
      inputRef.current.setSelectionRange(model.cursorPos, model.cursorPos);
  }, [model]);

  const onChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (editMode == true) {
        const v = e.target.value.replace(ampm ? /[^0-9AMP]/gi : /[^0-9]/gi, '');
        if (v.length > 0) {
          const matched = v.match(/(\d*)([amp]*)/i);
          if (matched != null) {
            const numbers = ampm ? (matched[1] ?? '').substr(0, 4) : matched[1] ?? '';
            const ampmPart = sanitizeAmPm(matched[2]);

            const high = numbers.length > 2 ? numbers.substr(0, numbers.length - 2) : undefined;
            const low = numbers.length > 2 ? numbers.substr(numbers.length - 2) : numbers;
            let result = '';
            if (high != null) result += high + ':';
            if (low != null) result += low;
            if (ampmPart.length > 0) result += ' ' + ampmPart;
            let pos = e.target.selectionEnd;
            const prevValue = model?.value ?? '';
            if (pos != null && result.includes(':') && !prevValue.includes(':')) pos++;
            if (pos != null && /[amp]/i.test(result) && !/[amp]/i.test(prevValue)) pos++;
            setModel({
              value: result,
              cursorPos: pos
            });
          }
        } else {
          setModel({ value: '', cursorPos: 0 });
        }
      }
    },
    [editMode, ampm, model]
  );

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(true);
  }, [canChangeMode]);

  const onBlurCallback = useCallback(() => {
    if (canChangeMode === true) {
      setEditMode(false);
      let result = 0;
      if (value != null && value.length > 0) {
        const v = value.replace(ampm ? /[^0-9AMP:]/gi : /[^0-9:]/gi, '');
        const matched = v.match(/(\d+)?(:(\d*))?([amp]+)?/i);
        if (matched != null) {
          let hours = parseInt(matched[1] ?? '0');
          let minutes = parseInt(matched[3] ?? '0');
          const am = /[a]/gi.test(matched[4]);
          const pm = /[p]/gi.test(matched[4]);
          if (ampm) {
            if (hours > 12) {
              if (hours > 23) hours = 23;
            } else if (hours == 12) {
              hours = am ? 0 : 12;
            } else {
              hours = pm ? hours + 12 : hours;
            }
          } else {
            if (matched[3] == null) {
              minutes = hours;
              hours = 0;
            }
          }
          if (minutes > 59) minutes = 59;
          result = hours * 60 + minutes;
        }
      }
      if (result != originalValue) onChange(result);
      setModel({
        value: result > 0 ? formatMinutes(result, ampm) : '',
        cursorPos: null
      });
    }
  }, [canChangeMode, onChange, value, ampm, originalValue]);

  return editMode
    ? renderEditor(value, inputRef, onBlurCallback, onChangeCallback)
    : renderViewer(originalValue, hideZeros, ampm, doubleClickCallback, children, justifyContent);
};

const renderViewer = (
  value: number | undefined,
  hideZeros: boolean | undefined,
  ampm: boolean | undefined,
  doubleClickCallback: () => void,
  children: React.ReactNode,
  justifyContent: 'start' | 'center' | 'end'
) => (
  <StaticCell onDoubleClick={doubleClickCallback} className="timeCell" justifyContent={justifyContent}>
    <div>{hideZeros && (value == null || value === 0) ? '' : formatMinutes(value ?? 0, ampm)}</div>
    {children}
  </StaticCell>
);

const renderEditor = (
  value: string,
  inputRef: React.RefObject<HTMLInputElement>,
  onBlur: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => <input ref={inputRef} value={value} autoFocus className="timeCell" onBlur={onBlur} onChange={onChange} />;

const sanitizeAmPm = (value: string | undefined) => {
  const ampmFlags = { a: false, p: false, m: false };
  return (value ?? '').replace(/[amp]/gi, x => {
    const { a, p, m } = ampmFlags;
    switch (x) {
      case 'M':
      case 'm':
        ampmFlags.m = true;
        return m || (!a && !p) ? '' : x;
      case 'A':
      case 'a':
        ampmFlags.a = true;
        return a || p ? '' : x;
      case 'P':
      case 'p':
        ampmFlags.p = true;
        return a || p ? '' : x;
    }
    return '';
  });
};

export const formatMinutes = (value: number, ampm = false) => {
  let hours = Math.floor(value / 60);
  const minutes = (value % 60).toString().padStart(2, '0');
  if (!ampm || hours >= 24) return `${hours}:${minutes}`;
  const pm = hours >= 12;
  hours = pm && hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${hours.toString()}:${minutes}${pm ? ' PM' : ' AM'}`;
};
