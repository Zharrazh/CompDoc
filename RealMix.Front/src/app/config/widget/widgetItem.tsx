import React from 'react';

import { DefaultPage, CancelButton, Button } from 'shared';
import { WidgetType } from 'enums/WidgetType';

export const WidgetItem: React.FC = () => {
  console.log(WidgetType.name(WidgetType.Text));
  console.log(WidgetType.all);
  console.log(WidgetType);
  return (
    <DefaultPage title="Widget Item Test">
      <Button primary>Save</Button>
      <CancelButton ml="3" />
    </DefaultPage>
  );
};
