import React from 'react';
import { AsyncActions } from 'app/actionTypes';
import { Button, ButtonProps } from '../base/button';
import { Spinner } from '../';
import { findLoaderItem } from 'core/reduxHelper';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';

interface Props extends ButtonProps {
  actionType: AsyncActions;
  mod?: string;
}

export const LoadingButton: React.FC<Props> = ({ actionType, mod = undefined, children, ...other }) => {
  const item = useSelector((state: StoreType) => findLoaderItem(state.loader, actionType, mod));
  const content = item && item.isWait ? <Spinner small /> : children;
  return <Button {...other}>{content}</Button>
}