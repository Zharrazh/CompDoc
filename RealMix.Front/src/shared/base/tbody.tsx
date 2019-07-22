import React from 'react';

interface Props {
  className?: string;
}

export const TBody: React.FC<Props> = ({ className, children }) => {
  return <tbody className={className}>{children}</tbody>;
};
