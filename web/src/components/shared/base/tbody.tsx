import React from 'react';

interface Props {
  className?: string;
}

export const TBody: React.FC<React.PropsWithChildren<Props>> =
  ({ className, children }) => {
    return <tbody className={className}>{children}</tbody>
  };