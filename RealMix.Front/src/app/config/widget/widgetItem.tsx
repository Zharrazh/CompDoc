import React from 'react';
import { DefaultPage, Button } from 'shared';
import { useHistory } from 'core/routerHooks';

export const WidgetItem: React.FC = () => {
  var history = useHistory();
  return (
    <DefaultPage title="Widget Item Test">
      <Button primary onClick={() => history.goBack()}>Cancel</Button>
    </DefaultPage>
  );
};