import React from 'react';

import { PagePanel, PageHeaderPanel, PageHeader, PageBodyPanel } from './pageComponents';

interface Props {
  title: string;
}

export const DefaultPage: React.FC<Props> = ({ title, children }) => (
  <PagePanel>
    <PageHeaderPanel>
      <PageHeader>{title}</PageHeader>
    </PageHeaderPanel>
    <PageBodyPanel>{children}</PageBodyPanel>
  </PagePanel>
);
