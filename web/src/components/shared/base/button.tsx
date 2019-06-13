import React from 'react';
import classNames from 'classnames';
import { SpaceProps, propsToSpace } from './spaceUtil';

export interface ButtonProps extends SpaceProps {
  tag?: React.ElementType;
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  light?: boolean;
  dark?: boolean;
  link?: boolean;
  outline?: boolean;
  large?: boolean;
  small?: boolean;
  block?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> =
  ({ tag: Tag = 'button', className, outline,
    primary, secondary, success, danger, warning, info, light, dark, link,
    large, small, block, children, ...other }) => {
    const classes = classNames('btn', {
      'btn-primary': !outline && primary,
      'btn-secondary': !outline && secondary,
      'btn-success': !outline && success,
      'btn-danger': !outline && danger,
      'btn-warning': !outline && warning,
      'btn-info': !outline && info,
      'btn-light': !outline && light,
      'btn-dark': !outline && dark,
      'btn-link': !outline && link,
      'btn-outline-primary': !!outline && primary,
      'btn-outline-secondary': !!outline && secondary,
      'btn-outline-success': !!outline && success,
      'btn-outline-danger': !!outline && danger,
      'btn-outline-warning': !!outline && warning,
      'btn-outline-info': !!outline && info,
      'btn-outline-light': !!outline && light,
      'btn-outline-dark': !!outline && dark,
      'btn-outline-link': !!outline && link,
      'btn-lg': large,
      'btn-md': small,
      'btn-block': block
    }, propsToSpace(other), className);
    return <Tag type={Tag === 'button' ? 'button' : undefined} className={classes} {...other}>{children}</Tag>
  };