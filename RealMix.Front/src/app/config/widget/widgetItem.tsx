import React from 'react';
import { DefaultPage, Button } from 'shared';
import { useHistory } from 'core/routerHooks';
import { WidgetType } from 'enums/WidgetType';

export const WidgetItem: React.FC = () => {
  console.log(WidgetType.name(WidgetType.Text));
  console.log(WidgetType.all);
  console.log(WidgetType);
  var history = useHistory();
  return (
    <DefaultPage title="Widget Item Test">
      <Button primary onClick={() => history.goBack()}>
        Cancel
      </Button>
    </DefaultPage>
  );
};
