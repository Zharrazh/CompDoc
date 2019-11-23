import React, { useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';

import { Icon } from 'shared';

import { StaticCell } from './staticCell';

import './checkboxCell.scss';

interface Props {
  value: boolean;
  canChangeMode?: boolean;
  editMode?: boolean;
  onChange: (value: boolean) => any;
}

export const CheckboxCell: React.FC<Props> = ({
  value: originalValue,
  canChangeMode = false,
  editMode: originalEditMode = false,
  onChange
}) => {
  const [editMode, setEditMode] = useState(originalEditMode === true);

  const value = useMemo(() => (originalValue != null ? !!originalValue : false), [originalValue]);

  const clickCallback = useCallback(() => {
    if (editMode === true) onChange(!value);
  }, [editMode, onChange, value]);

  const doubleClickCallback = useCallback(() => {
    if (canChangeMode === true) setEditMode(true);
  }, [canChangeMode]);

  const onBlur = useCallback(() => {
    if (canChangeMode === true) setEditMode(false);
  }, [canChangeMode]);

  return (
    <StaticCell
      justifyContent="center"
      tabIndex={0}
      onDoubleClick={doubleClickCallback}
      onClick={clickCallback}
      onBlur={onBlur}
      className={classNames('checkboxCell', { highlight: canChangeMode && editMode })}>
      <Icon prefix="far" name={value ? 'check-square' : 'square'}></Icon>
    </StaticCell>
  );
};
