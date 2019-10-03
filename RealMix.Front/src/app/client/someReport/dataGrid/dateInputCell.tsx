import React, { useMemo, useState, useCallback, createRef } from 'react';
import DatePicker from 'react-datepicker';
import TextMask, { conformToMask } from 'react-text-mask';

import { StaticCell } from './staticCell';

import 'react-datepicker/dist/react-datepicker.css';
import './dateInputCell.scss';

interface Props {
  value: Date;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: Date) => any;
}

export const DateInputCell = ({
  value: originalValue,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange
}: Props) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);

  const value = useMemo(() => originalValue, [originalValue]);
  const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  const inputRef = createRef<TextMask>();
  const datePickerRef = createRef<DatePicker>();

  const onChangeCallback = useCallback(
    (value: Date) => {
      if (editMode == true) onChange(value);
    },
    [editMode, onChange]
  );

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) {
      setEditMode(true);
    }
  }, [canChangeMode]);

  const onBlurCallback = useCallback(() => {
    if (canChangeMode === true) {
      setEditMode(false);
    }
  }, [canChangeMode]);

  const onClickCallback = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.inputElement.focus();
      let input = inputRef.current.inputElement as HTMLInputElement;
      setTimeout(() => {
        if (input.selectionStart == input.selectionEnd) input.setSelectionRange(10, 10);
      });
    }

    if (datePickerRef.current) {
      datePickerRef.current.setState({ preSelection: null });
    }
  }, [inputRef, datePickerRef]);

  return editMode
    ? renderEditor(value, onChangeCallback, onBlurCallback, onClickCallback, mask, inputRef, datePickerRef)
    : renderViewer(value, doubleClickCallback, mask);
};

const renderViewer = (value: Date, doubleClickCallback: () => void, mask: (string | RegExp)[]) => {
  return value ? (
    <StaticCell onDoubleClick={doubleClickCallback}>{convertFromDate(value, mask)}</StaticCell>
  ) : (
    <StaticCell onDoubleClick={doubleClickCallback}></StaticCell>
  );
};

const renderEditor = (
  value: Date,
  onChange: (value: Date) => void,
  onBlur: () => void,
  onClick: () => void,
  mask: (string | RegExp)[],
  inputRef: React.RefObject<TextMask>,
  datePickerRef: React.RefObject<DatePicker>
) => {
  return (
    <div onClick={onClick}>
      <DatePicker
        selected={value}
        shouldCloseOnSelect={false}
        onChange={onChange}
        onBlur={onBlur}
        ref={datePickerRef}
        customInput={
          <div onClick={() => {}}>
            <TextMask
              autoFocus
              className="dateInputCell"
              type="text"
              value={convertFromDate(value, mask)}
              mask={mask}
              keepCharPositions={true}
              ref={inputRef}
            />
          </div>
        }
      />
    </div>
  );
};

const convertFromDate = (value: Date, mask: (string | RegExp)[]) => {
  if (!value) return '__/__/____';
  const mm = (value.getMonth() + 1).toString();
  const dd = value.getDate().toString();

  const str = [mm.length === 2 ? '' : '0', mm, dd.length === 2 ? '' : '0', dd, value.getFullYear()].join('');

  return conformToMask(str, mask, { guide: false }).conformedValue;
};
