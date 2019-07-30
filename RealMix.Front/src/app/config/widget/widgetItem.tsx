import React, { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultPage, CancelButton, Button, TextBoxField, SelectField, Row } from 'shared';
import { WidgetType } from 'enums/WidgetType';
import { useMatch } from 'core/routerHooks';
import { AppDispatch } from 'core/reduxHelper';
import { StoreType } from 'core/store';

import { getItemAsync, setItem, saveAsync } from './actions';

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
  const item = useSelector((state: StoreType) => state.config.widget.item);
  const match = useMatch<{ id: number }>();
  const dispatch = useDispatch<AppDispatch>();
  const get = useCallback(() => dispatch(getItemAsync(match.params)), [dispatch, match.params]);
  const save = useCallback(() => dispatch(saveAsync(item)), [dispatch, item]);
  useEffect(() => {
    if (match.params.id > 0) get();
  }, [get, match.params.id]);
  const change = (field: string, value: any) => {
    dispatch(setItem({ ...item, [field]: value }));
  };
  return (
    <DefaultPage title="Widget Item Test">
      <Row>
        <TextBoxField data={item} field="name" size={6} onChange={change} v={schema}>
          Name
        </TextBoxField>
        <SelectField data={item} field="type" values={WidgetType.all} size={6} onChange={change} v={schema}>
          Type
        </SelectField>
        <TextBoxField data={item} field="parameters" size={6} onChange={change} v={schema}>
          Parameters
        </TextBoxField>
      </Row>
      <div></div>
      <Button primary onClick={save}>
        Save
      </Button>
      <CancelButton ml="3" />
    </DefaultPage>
  );
};
