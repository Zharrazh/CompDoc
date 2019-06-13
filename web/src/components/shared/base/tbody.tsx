import React from 'react';

interface Props {
  className?: string;
}

export const TBody: React.FC<React.PropsWithChildren<Props>> =
  ({ className, children, ...other }) => {
    return <tbody className={className} {...other}>{children}</tbody>
  };