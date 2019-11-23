import React from 'react';

import { PagePanel, PageHeaderPanel, PageHeader, PageBodyPanel } from './pageComponents';

interface Props {
  title: string;
  className?: string;
}

export const DefaultPage: React.FC<Props> = ({ title, children, className }) => (
  <PagePanel className={className}>
    <PageHeaderPanel>
      <PageHeader>{title}</PageHeader>
    </PageHeaderPanel>
    <PageBodyPanel>{children}</PageBodyPanel>
  </PagePanel>
);
