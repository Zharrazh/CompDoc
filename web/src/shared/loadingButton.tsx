import React from 'react';
import { AsyncActions } from 'app/actionTypes';
import { Button, ButtonProps } from './base/button';
import { Spinner } from './base';
import { findLoaderItem } from 'core/reduxHelper';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';

interface Props extends ButtonProps {
  actionType: AsyncActions;
  mod?: string;
}

export const LoadingButton: React.FC<React.PropsWithChildren<Props>> = ({ actionType, mod = undefined, children, ...other }) => {
  const item = useSelector((state: StoreType) => findLoaderItem(state.loader, actionType, mod));
  const content = item && item.isWait ? <Spinner /> : children;
  return <Button {...other}>{content}</Button>
}