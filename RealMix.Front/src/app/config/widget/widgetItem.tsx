import React, { useState } from 'react';
import * as yup from 'yup';

import { DefaultPage, CancelButton, Button, TextBoxField, Row } from 'shared';
import { WidgetType } from 'enums/WidgetType';

import { WidgetModel } from './models';

const schema = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .required()
    .min(3)
    .max(20)
    .label('Name')
});

export const WidgetItem: React.FC = () => {
  const [item, setItem] = useState<WidgetModel>({
    id: 0,
    name: '',
    type: WidgetType.Text,
    created: new Date(),
    updated: new Date()
  });
  const change = (field: string, value: any) => {
    setItem({ ...item, [field]: value });
  };
  return (
    <DefaultPage title="Widget Item Test">
      <Row>
        <TextBoxField data={item} field="name" size={6} onChange={change} v={schema}>
          Name
        </TextBoxField>
        <TextBoxField data={item} field="name" size={6} onChange={change} v={schema}>
          Name
        </TextBoxField>
        <TextBoxField data={item} field="name" size={6} onChange={change} v={schema}>
          Name
        </TextBoxField>
      </Row>
      <div></div>
      <Button primary>Save</Button>
      <CancelButton ml="3" />
    </DefaultPage>
  );
};
